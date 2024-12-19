import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function verifyAdmin(req) {
  // Clone the request URL for redirection
  const url = req.nextUrl.clone();

  // Extract the token from cookies
  const token = req.cookies.get("token")?.value; // Ensure the key matches your cookie configuration

  // Redirect to login if no token is found
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Check if the user is an admin
    if (decoded.role !== "admin") {
      url.pathname = "/403"; // Redirect to a 403 Forbidden page
      return NextResponse.redirect(url);
    }
  } catch (err) {
    // If token verification fails, redirect to login
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Proceed to the next middleware or route handler
  return NextResponse.next();
}

// Middleware configuration: Apply to admin routes
export const config = {
  matcher: ["/dashboard/overview:path*"], // Adjust paths to match your protected admin routes
};
