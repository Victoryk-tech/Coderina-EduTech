import { MongoClient } from "mongodb";

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

const connectToDatabase = async () => {
  const client = await MongoClient.connect(MONGODB_URI);
  return client.db(MONGODB_DB);
};

// Named export for handling POST requests
export async function POST(req) {
  const db = await connectToDatabase();
  const collection = db.collection("subscribers");

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
      });
    }

    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      return new Response(
        JSON.stringify({ error: "Email already subscribed." }),
        { status: 400 }
      );
    }

    // Add the new email
    await collection.insertOne({ email, subscribedAt: new Date() });
    return new Response(
      JSON.stringify({ message: "Successfully subscribed!" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// Named export for handling GET requests
export async function GET() {
  const db = await connectToDatabase();
  const collection = db.collection("subscribers");

  try {
    const subscribers = await collection.find().toArray();
    return new Response(JSON.stringify(subscribers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
