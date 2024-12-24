import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// This is the JWT secret key used to verify the token
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || "your-jwt-secret";

// Middleware function to protect routes
export function middleware(request) {
  const token = request.cookies.get("token");

  // Check if the user is trying to access the dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // If there's no token, redirect the user to the sign-in page
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify the token
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next(); // Allow access to the dashboard
    } catch (error) {
      // If the token is invalid or expired, redirect to sign-in page
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow other routes to pass through
  return NextResponse.next();
}

// Define paths where the middleware will be applied (optional)
export const config = {
  matcher: ["/dashboard", "/dashboard/*"], // Protect the dashboard route and its subpages
};
