"use client";
import React from "react";
import AboutHeader from "./components/AboutHeader";
import AboutMV from "./components/AboutMV";
import Impact from "./components/Impact";
import Navbar from "../Home/Navbar";
import Team from "./components/Team";

const page = () => {
  return (
    <div>
      <Navbar />
      <AboutHeader />
      <AboutMV />
      <Impact />
      <Team />
    </div>
  );
};

export default page;
