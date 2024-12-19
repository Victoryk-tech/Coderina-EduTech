import { NextResponse } from "next/server";
import connectDB from "../../lib/dbConnect";
import users from "../../models/user";
// import handleUpload from "../../utils/cloudinary";
// import generateToken from "../../utils/token";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// Connect to the database
connectDB();

// Fetch all users
export async function GET(req) {
  try {
    const users = await users.find({}).select("-password").sort("-createdAt");

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
    const { username, email, password, role } = await req.json();

    if (!username || !email || !password) {
      throw new Error("Missing required fields: username, email, or password");
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await users.create({ username, email, password, role });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    const response = NextResponse.json(
      { user: userWithoutPassword, token },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
      sameSite: "Strict",
    });

    return response;
  } catch (error) {
    console.error("Error during sign-up:", error);
    return NextResponse.json(
      { error: `Error during sign-up: ${error.message}` },
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
    const user = await users.findByIdAndUpdate(
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
    const user = await users.findByIdAndDelete(id);

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
