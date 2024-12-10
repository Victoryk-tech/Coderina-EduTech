"use client";
import React from "react";

import "./globals.css";
import Navbar from "./Home/Navbar";
import Header from "./Home/Header";
import AboutSection from "./Home/AboutSection";
import Upcoming from "./Home/Upcoming";
import Partners from "./Home/SubscribeForm";
import Footer from "./Home/Footer";
import Experience from "./Home/Experience";
import News from "./Home/News";
import Activities from "./Home/Activities";
import Subscribers from "./Home/Subscribers";

const page = () => {
  return (
    <div className="overflow-hidden font-Geist w-full">
      <div className="">
        <Header />
      </div>
      <AboutSection />
      <Upcoming />
      <Activities />
      <News />
      <Experience />
      <Subscribers />
    </div>
  );
};

export default page;
