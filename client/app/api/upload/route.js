import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Readable } from "stream";
import { GridFSBucket } from "mongodb";
import connectDB from "../../lib/dbConnect";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  try {
    await connectDB();

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, {
      bucketName: "uploads",
    });

    const readablePhotoStream = Readable.from(file.stream());
    const uploadStream = bucket.openUploadStream(file.name);

    readablePhotoStream.pipe(uploadStream);

    return new Promise((resolve, reject) => {
      uploadStream.on("finish", () => {
        const fileUrl = `/api/upload/${uploadStream.id}`; // The URL to access the image
        resolve(
          NextResponse.json({
            message: "File uploaded successfully",
            url: fileUrl,
          })
        );
      });

      uploadStream.on("error", (err) => {
        console.error("Error uploading file:", err);
        reject(
          NextResponse.json(
            { message: "Error uploading file" },
            { status: 500 }
          )
        );
      });
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
