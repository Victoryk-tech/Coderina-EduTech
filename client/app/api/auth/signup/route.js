import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnect";
import users from "../../../models/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { username, email, password, confirmPassword, role } =
      await req.json();

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if user exists
    const userExists = await users.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new users({
      username,
      email,
      password, // plain password, will be hashed in pre-save hook
      role,
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        token,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          role: savedUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error); // For debugging
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
