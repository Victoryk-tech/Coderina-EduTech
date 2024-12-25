import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// This is the JWT secret key used to verify the token
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || "your-jwt-secret";

// Middleware function to protect routes
export async function middleware(req) {
  // Check if the user is trying to access the dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token");

    if (!token) {
      // If there's no token, redirect to the login page
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify the token using the JWT secret
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Attach user info to the request
      return NextResponse.next(); // Allow access to the dashboard
    } catch (error) {
      // If the token is invalid or expired, redirect to login page
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow other routes to pass through (e.g., public pages)
  return NextResponse.next();
}

// Define paths where the middleware will be applied
export const config = {
  matcher: ["/dashboard"], // Protect these paths
};
