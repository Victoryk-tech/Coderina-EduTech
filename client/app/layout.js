"use client"; // This line ensures this component runs on the client side.

import React, { Suspense } from "react";
import "./globals.css";
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer";
import { AuthProvider } from "./lib/providers";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Coderina",
  description:
    "First Lego League Nigeria is a STEM-focused program that encourages young students to explore science, technology, engineering, and math through hands-on learning and robotics. Part of the global First Lego League initiative, it inspires innovation and teamwork among children aged 9-16 in Nigeria, helping them develop critical thinking, problem-solving, and coding skills by tackling real-world challenges. The program fosters a spirit of collaboration and creativity, preparing the next generation of leaders and innovators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/codelogo.png" // Ensure the favicon path is correct
          type="image/png"
          className="w-48"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="font-Inter bg-[#FFF5E5]">
        <div>
          <AuthProvider>
            <Suspense fallback={null}>
              <Navbar />
              {children}
            </Suspense>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
