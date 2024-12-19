import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnect";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

connectDB();

// Login handler
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { username: user.username, token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error during login: ${error.message}` },
      { status: 500 }
    );
  }
}
