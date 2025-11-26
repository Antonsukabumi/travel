import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "wanderlens";

declare global {
  var _mongoClient: MongoClient | undefined;
  var _mongoDb: Db | undefined;
}

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error(
      "Environment variable MONGODB_URI belum dikonfigurasi. Tambahkan ke .env.local.",
    );
  }

  if (global._mongoDb) {
    return global._mongoDb;
  }

  const client = global._mongoClient ?? new MongoClient(uri);
  if (!global._mongoClient) {
    global._mongoClient = client;
  }

  if (!client.topology?.isConnected()) {
    await client.connect();
  }

  const db = client.db(dbName);
  global._mongoDb = db;

  return db;
}

