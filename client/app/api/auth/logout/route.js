// In /api/auth/logout.js

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the token from cookies
  response.cookies.delete("token", { path: "/" });

  return response;
}
