import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.URI;

export default async function() {
  try {
    const client = new MongoClient(URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};