"use client";
import React from "react";
import Image from "next/image";
import { Box, Container } from "@mui/material";
import "./globals.css";

import Upcoming from "./Home/components/Upcoming";

import News from "./Home/components/News";
import Partners from "./Home/components/Partners";
import Footer from "./Home/components/Footer";
import Experience from "./Home/components/Experience";
import {
  blackCard,
  blackColor,
  blueColor,
  greenBg,
  headerBackground,
  pinkBg,
  whiteColor,
} from "./utils/constants";
import Header from "./Home/components/Header";
import AboutSection from "./Home/components/AboutSection";
import Activity from "./Home/components/Activity";

export default function Home() {
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
      section: <Activity />,
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
      section: <Partners />,
    },
    {
      color: blackColor,
      section: <Footer />,
    },
  ];

  return (
    <div className="font-Geist">
      <Box overflow={"hidden"}>
        <Box bgcolor={headerBackground}>
          <Header />
        </Box>
        {homeContents1.map(({ color, section }) => (
          <Box p={4} key={section} bgcolor={color}>
            <Container maxWidth="xl">{section}</Container>
          </Box>
        ))}
      </Box>
    </div>
  );
}
