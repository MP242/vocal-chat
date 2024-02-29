import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;

const createMongoClient = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
};

clientPromise = createMongoClient();

export default clientPromise;
