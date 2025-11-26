import { randomUUID } from "crypto";
import { MongoBulkWriteError, WithId } from "mongodb";
import {
  INSIGHT_METRICS,
  PHOTOGRAPHY_PACKAGES,
  STORIES,
  TESTIMONIALS,
  TRAVEL_PACKAGES,
} from "./seed-data";
import { getDb } from "./mongodb";
import type {
  BookingInput,
  BookingRecord,
  InsightMetric,
  PhotographyPackage,
  Story,
  Testimonial,
  TravelPackage,
} from "./types";

const TRAVEL_COLLECTION = "travelPackages";
const PHOTO_COLLECTION = "photographyPackages";
const BOOKING_COLLECTION = "bookings";

const isDbConfigured = Boolean(process.env.MONGODB_URI);
let seeded = false;
let seedingPromise: Promise<void> | null = null;

const normalizeDoc = <T extends Record<string, unknown>>(doc: WithId<T>) => ({
  ...doc,
  _id: doc._id.toString(),
});

async function ensureSeedData() {
  if (!isDbConfigured || seeded) {
    return;
  }

  if (!seedingPromise) {
    seedingPromise = (async () => {
      const db = await getDb();

      await maybeSeedCollection(db, TRAVEL_COLLECTION, TRAVEL_PACKAGES);
      await maybeSeedCollection(db, PHOTO_COLLECTION, PHOTOGRAPHY_PACKAGES);

      await db
        .collection(BOOKING_COLLECTION)
        .createIndex({ createdAt: -1 }, { name: "createdAt_desc" })
        .catch(() => null);

      seeded = true;
    })().finally(() => {
      seedingPromise = null;
    });
  }

  return seedingPromise;
}

function isDuplicateKeyError(error: unknown) {
  return (
    error instanceof MongoBulkWriteError ||
    (typeof error === "object" &&
      error !== null &&
      "code" in error &&
      // @ts-expect-error `code` exists when error berasal dari driver Mongo.
      error.code === 11000)
  );
}

async function maybeSeedCollection<T extends Record<string, unknown>>(
  db: Awaited<ReturnType<typeof getDb>>,
  collectionName: string,
  docs: T[],
) {
  const collection = db.collection(collectionName);
  if ((await collection.countDocuments()) > 0) {
    return;
  }

  try {
    await collection.insertMany(docs, { ordered: false });
  } catch (error) {
    if (!isDuplicateKeyError(error)) {
      throw error;
    }
  }
}

export async function getTravelPackages(options?: {
  featuredOnly?: boolean;
  limit?: number;
}): Promise<(TravelPackage & { _id?: string })[]> {
  if (!isDbConfigured) {
    return options?.featuredOnly
      ? TRAVEL_PACKAGES.filter((pkg) => pkg.featured)
      : TRAVEL_PACKAGES;
  }

  await ensureSeedData();
  const db = await getDb();
  const query = options?.featuredOnly ? { featured: true } : {};
  const cursor = db
    .collection<TravelPackage>(TRAVEL_COLLECTION)
    .find(query)
    .sort({ featured: -1, price: 1, title: 1 });

  if (options?.limit) {
    cursor.limit(options.limit);
  }

  const docs = await cursor.toArray();
  return docs.map((doc) => normalizeDoc(doc));
}

export async function getTravelPackageBySlug(slug: string) {
  if (!isDbConfigured) {
    return TRAVEL_PACKAGES.find((pkg) => pkg.slug === slug);
  }
  await ensureSeedData();
  const db = await getDb();
  const doc = await db
    .collection<TravelPackage>(TRAVEL_COLLECTION)
    .findOne({ slug });
  return doc ? normalizeDoc(doc) : null;
}

export async function getPhotographyPackages(): Promise<
  (PhotographyPackage & { _id?: string })[]
> {
  if (!isDbConfigured) {
    return PHOTOGRAPHY_PACKAGES;
  }
  await ensureSeedData();
  const db = await getDb();
  const docs = await db
    .collection<PhotographyPackage>(PHOTO_COLLECTION)
    .find()
    .sort({ price: -1 })
    .toArray();
  return docs.map((doc) => normalizeDoc(doc));
}

export function getStories(): Story[] {
  return STORIES;
}

export function getTestimonials(): Testimonial[] {
  return TESTIMONIALS;
}

export function getInsightMetrics(): InsightMetric[] {
  return INSIGHT_METRICS;
}

export async function getRecentBookings(limit = 4): Promise<BookingRecord[]> {
  if (!isDbConfigured) {
    return [];
  }
  await ensureSeedData();
  const db = await getDb();
  const docs = await db
    .collection<BookingInput & { createdAt: Date }>(BOOKING_COLLECTION)
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt.toISOString(),
  }));
}

export async function createBooking(
  input: BookingInput,
): Promise<BookingRecord> {
  if (!input.travelPackageSlug && !input.photographyPackageSlug) {
    throw new Error(
      "Mohon pilih minimal satu paket travel atau fotografi sebelum mengirim booking.",
    );
  }

  const record: BookingRecord = {
    ...input,
    _id: "",
    createdAt: new Date().toISOString(),
  };

  if (!isDbConfigured) {
    return { ...record, _id: randomUUID() };
  }

  await ensureSeedData();
  const db = await getDb();
  const insertResult = await db.collection(BOOKING_COLLECTION).insertOne({
    ...input,
    createdAt: new Date(),
  });

  return {
    ...input,
    _id: insertResult.insertedId.toString(),
    createdAt: new Date().toISOString(),
  };
}

