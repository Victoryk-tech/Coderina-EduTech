import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnect";
import users from "../../../models/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { email, newPassword, confirmPassword } = req.body;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
