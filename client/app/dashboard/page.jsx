// import { redirect } from "next/navigation";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers"; // To retrieve cookies in Next.js

import { redirect } from "next/navigation";

// export default async function Dashboard() {
//   // Retrieve the token from cookies
//   const token = cookies().get("token")?.value; // Ensure the token key matches your setup

//   // If no token is found, redirect to the login page
//   if (!token) {
//     return redirect("/login");
//   }

//   try {
//     // Verify the token using the secret
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // Check if the user is an admin
//     if (decoded.role !== "admin") {
//       return redirect("/403"); // Redirect to a Forbidden page
//     }
//   } catch (err) {
//     console.error("Token verification failed:", err); // Log error for debugging
//     return redirect("/login");
//   }

//   // If everything is good, redirect to the dashboard overview
//   return redirect("/dashboard/overview");
// }

export default async function Dashboard() {
  redirect("/dashboard/overview");
}
