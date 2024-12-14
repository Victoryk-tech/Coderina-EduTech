import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

// const connectToDatabase = async () => {
//   const client = await MongoClient.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   return client.db(MONGODB_DB);
// };

export default async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is undefined. Check .env setup.");
    return;
  }

  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(uri);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error(
        "MongoDB connection error: please make sure MongoDB is running. Error:",
        err
      );
      process.exit(1); // Exit the process with a failure code
    });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
