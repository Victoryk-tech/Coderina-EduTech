import { NextResponse } from "next/server";
import connectDB from "../../lib/dbConnect";
import User from "../../models/user";
import handleUpload from "../../utils/cloudinary";
import generateToken from "../../utils/token";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// Connect to the database
connectDB();

// Fetch all users
export async function GET(req) {
  try {
    const users = await User.find({}).select("-password").sort("-createdAt");

    if (!users.length) {
      return NextResponse.json({ message: "No users found!" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching users: ${error.message}` },
      { status: 500 }
    );
  }
}

// Create a new user (SIGNUP)

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await User.create({ email, password, username });

    // Generate JWT
    const token = generateToken({ id: newUser._id, email });

    return NextResponse.json(
      { user: { username: newUser.username }, token },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error creating user: ${error.message}` },
      { status: 500 }
    );
  }
}

// Update a user
export async function PATCH(req) {
  try {
    const { id, username, email, address, phone, profilePicture } =
      await req.json();

    // Update user information
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, address, phone, profilePicture },
      { new: true }
    );

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

// Delete a user
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Delete the user by ID
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error deleting user: ${error.message}` },
      { status: 500 }
    );
  }
}
