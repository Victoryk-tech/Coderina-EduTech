import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  // Create a response object
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Delete the token cookie
  //response.cookies.delete("token");

  return (await cookies()).delete("token");
}
