import { NextResponse } from "next/server";
import { z } from "zod";
import { createBooking } from "@/lib/data-service";

const bookingSchema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    phone: z.string().min(8).max(20).optional(),
    startDate: z.string(),
    travelers: z.coerce.number().int().min(1).max(24),
    message: z.string().max(500).optional(),
    travelPackageSlug: z.string().optional(),
    photographyPackageSlug: z.string().optional(),
  })
  .refine(
    (values) => values.travelPackageSlug || values.photographyPackageSlug,
    {
      message: "Pilih minimal satu paket travel atau fotografi.",
      path: ["travelPackageSlug"],
    },
  );

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = bookingSchema.parse(payload);
    const booking = await createBooking(parsed);

    return NextResponse.json({ data: booking });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.flatten() },
        { status: 422 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

