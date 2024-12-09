"use client";
import React from "react";

import "./globals.css";
import Navbar from "./Home/Navbar";
import Header from "./Home/Header";
import AboutSection from "./Home/AboutSection";
import Upcoming from "./Home/Upcoming";
import Partners from "./Home/Partners";
import Footer from "./Home/Footer";
import Experience from "./Home/Experience";
import News from "./Home/News";
import Activities from "./Home/Activities";

const page = () => {
  return (
    <div className="overflow-hidden font-Geist w-full">
      <div className="bg-[#FFF5E5]">
        <Navbar />
        <Header />
      </div>
      <AboutSection />
      <Upcoming />
      <Activities />
      <News />
      <Experience />
      <Partners />
      <Footer />
    </div>
  );
};

export default page;
