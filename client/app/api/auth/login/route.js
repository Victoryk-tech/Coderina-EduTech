import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnect";
import users from "../../../models/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// Connect to the database

// POST request to sign in user
export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    const { email, password } = await req.json();

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      {
        message: "User signed in successfully",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
