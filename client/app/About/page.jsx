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

const page = () => {
  return (
    <div>
      <AboutHeader />
      <AboutMV />

      <Impact />
      <Team />
      <Subscribers />
    </div>
  );
};

export default page;
