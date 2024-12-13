"use client";
import React from "react";
import { Box, Container } from "@mui/material";
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
import {
  blackCard,
  blackColor,
  blueColor,
  greenBg,
  headerBackground,
  pinkBg,
  whiteColor,
} from "./utils/constants";

const page = () => {
  const homeContents1 = [
    // {
    //     color: headerBackground,
    //     section: <Header />
    // },
    {
      // color: greenBg,
      section: <AboutSection />,
    },
    {
      color: blackCard,
      section: <Upcoming />,
    },
    {
      // color: blueColor,
      section: <Activities />,
    },
    {
      color: whiteColor,
      section: <News />,
    },
    {
      color: whiteColor,
      section: <Experience />,
    },
    {
      color: headerBackground,
      section: <Subscribers />,
    },
  ];

  return (
    <div overflow={"hidden"}>
      <div bgcolor={headerBackground}>
        <Header />
      </div>
      {homeContents1.map(({ color, section }, index) => (
        <div key={`${section}-${index}`} bgcolor={color}>
          <div>{section}</div>
        </div>
      ))}
    </div>
    // <div className="overflow-hidden font-Geist w-full">
    //   <div className="bg-[#FFF5E5]">
    //     <Navbar />
    //     <Header />
    //   </div>
    //   <AboutSection />
    //   <Upcoming />
    //   <Activities />
    //   <News />
    //   <Experience />
    //   <Subscribers />
    // </div>
  );
};

export default page;
