import { MongoClient, ObjectId } from "mongodb";

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

export async function GET(req) {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("subscribers");

    // Fetch all subscribers
    const subscribers = await collection.find({}).toArray();

    return new Response(JSON.stringify({ success: true, subscribers }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing subscriber ID" }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection("subscribers");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Subscriber not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Subscriber deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
