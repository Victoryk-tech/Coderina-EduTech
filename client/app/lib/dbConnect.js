import mongoose from "mongoose";

// Track connection status
let isConnected = false;

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;

  // Ensure the MongoDB URI is provided
  if (!uri) {
    console.error("Error: MONGODB_URI is undefined. Check your .env setup.");
    throw new Error("Missing MONGODB_URI");
  }

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    // Establish a new MongoDB connection
    const db = await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 40000,
    });

    isConnected = db.connections[0].readyState === 1; // Check if the connection is successful
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(
      "MongoDB connection error: please make sure MongoDB is running. Error:",
      error
    );
    process.exit(1); // Exit the process with a failure code
  }
}
