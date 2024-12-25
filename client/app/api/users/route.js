import { NextResponse } from "next/server";
import connectDB from "../../lib/dbConnect";
import users from "../../models/user"; // The provided user model
import sharp from "sharp";
import fs from "fs";
import path from "path";

connectDB(); // Ensure database connection

// Fetch user by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const user = await users.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching user: ${error.message}` },
      { status: 500 }
    );
  }
}

// Update user profile by ID
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();

    const updates = {};
    ["username", "email", "address", "phone"].forEach((field) => {
      const value = formData.get(field);
      if (value) updates[field] = value;
    });

    const profilePicture = formData.get("profilePicture");
    if (profilePicture && profilePicture.name) {
      const buffer = Buffer.from(await profilePicture.arrayBuffer());
      const optimizedImage = await sharp(buffer)
        .resize(150, 150)
        .jpeg({ quality: 80 })
        .toBuffer();

      const imagePath = path.join("uploads", `${id}-profile.jpg`);
      fs.writeFileSync(imagePath, optimizedImage);
      updates.profilePicture = imagePath; // Store file path in the database
    }

    const user = await users.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error updating user: ${error.message}` },
      { status: 500 }
    );
  }
}
