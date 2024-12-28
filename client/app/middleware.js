// // import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// // // This is the JWT secret key used to verify the token
// const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || "your-jwt-secret";

// // // Middleware function to protect routes
// // export async function middleware(req) {
// //   // Check if the user is trying to access the dashboard
// //   if (req.nextUrl.pathname.startsWith("/dashboard/overview")) {
// //     const token = req.cookies.get("token");

// //     if (!token) {
// //       // If there's no token, redirect to the login page
// //       return NextResponse.redirect(new URL("/login", req.url));
// //     }

// //     try {
// //       // Verify the token using the JWT secret
// //       const decoded = jwt.verify(token, JWT_SECRET);
// //       req.user = decoded; // Attach user info to the request
// //       return NextResponse.next(); // Allow access to the dashboard
// //     } catch (error) {
// //       // If the token is invalid or expired, redirect to login page
// //       return NextResponse.redirect(new URL("/login", req.url));
// //     }
// //   }

// //   // Allow other routes to pass through (e.g., public pages)
// //   return NextResponse.next();
// // }

// // // Define paths where the middleware will be applied
// // export const config = {
// //   matcher: ["/dashboard/overview"], // Protect these paths
// //};

// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const token = req.cookies.get("token");
//   console.log("token string", token);
//   const isLoginPage = req.nextUrl.pathname === "/login";

//   if (!token) {
//     const redirectUrl = new URL("/login", req.url);
//     redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
//     return NextResponse.redirect(redirectUrl);
//   }
//   _;
//   if (token && isLoginPage) {
//     return NextResponse.redirect(new URL("/dashboard/overview", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*", "/login"],
// };

import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // Get the token from cookies
  const { pathname } = req.nextUrl; // Extract pathname from the request URL
  const isLoginPage = pathname === "/login";

  console.log("Token:", token);

  if (!token && pathname.startsWith("/dashboard")) {
    // Immediately return a redirect to the login page, avoiding route processing
    const redirectUrl = new URL("/login", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (token && isLoginPage) {
    // Redirect logged-in users away from the login page to the dashboard
    return NextResponse.redirect(new URL("/dashboard/overview", req.url));
  }

  // Allow access to other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Match protected and login routes
};
