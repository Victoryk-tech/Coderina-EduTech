import { NextResponse } from "next/server";
import connectDB from "../../lib/dbConnect";
import users from "../../models/mediaModel";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// Connect to the database
connectDB();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Find the user by email
    const user = await users.findOne({ email }).lean();
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    // Verify password
    const verifyPwd = await bcryptjs.compare(password, user.password);
    if (!verifyPwd) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" } // Token valid for 1 day
    );

    // Exclude password from the user object
    const { password: _, ...userWithoutPassword } = user;

    // Set cookies for token (Optional: Secure cookie settings)
    const response = NextResponse.json(
      { user: userWithoutPassword, token },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      maxAge: 24 * 60 * 60, // 1 day
      sameSite: "Strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Error during login: ${error.message}` },
      { status: 500 }
    );
  }
}
