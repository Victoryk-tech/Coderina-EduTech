"use client";
import React from "react";
import AboutHeader from "./components/AboutHeader";
import AboutMV from "./components/AboutMV";
import Impact from "./components/Impact";
import Navbar from "../Home/Navbar";
import Team from "./components/Team";
import CoreValues from "./components/CoreValues";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Subscribers from "../Home/Subscribers";
import Footer from "../Home/Footer";
import Foote from "../Home/Foote";
import SubscribeForm from "../Home/SubscribeForm";
import Testimonial from "./components/Testimonial";
import Space from "../Home/Space";
import Sponsors from "../Home/Sponsors";

const page = () => {
  return (
    <div>
      <AboutHeader />
      <AboutMV />

      <Impact />
      <Team />
      <Sponsors />
      <div className="px-2 md:px-4 lg:px-16 py-8 mt-6 md:mt-10">
        <Testimonial />
        <Space />
        <SubscribeForm />
      </div>
      <Footer />
    </div>
  );
};

export default page;
