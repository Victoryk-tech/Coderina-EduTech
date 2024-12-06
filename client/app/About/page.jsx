"use client";

import { Box, Container } from "@mui/material";
import React from "react";
import {
  blackCard,
  blackColor,
  blueCard2,
  gradient,
  gradient2,
  greenCard2,
  pinkBg,
  pinkBgR,
  whiteColor,
} from "../utils/constants";
import AboutHeader from "./components/AboutHeader";
import AboutImpact from "./components/AboutImpact";
import AboutMV from "./components/AboutMV";
import CoreValues from "./components/CoreValues";
import Scope from "./components/Scope";
import OurTeam from "./components/OurTeam";
import Partners from "../Home/components/Partners";
import Footer from "../Home/components/Footer";

const AboutUs = () => {
  const aboutContent = [
    {
      color: whiteColor,
      section: <AboutHeader />,
    },
    {
      color: gradient2,
      section: <AboutMV />,
    },
    {
      color: gradient,
      section: <AboutImpact />,
    },
    {
      color: blackCard,
      section: <CoreValues />,
    },
    // {
    //     color: blueCard2,
    //     section: <Scope />
    // },
    {
      color: whiteColor,
      section: <OurTeam />,
    },
    {
      color: pinkBg,
      section: <Partners />,
    },
    {
      color: blackColor,
      section: <Footer />,
    },
  ];

  return (
    <Box className="about__us">
      {aboutContent.map(({ color, section }) => (
        <Box p={4} key={section} sx={{ background: color }}>
          <Container maxWidth="xl">{section}</Container>
        </Box>
      ))}
    </Box>
  );
};

export default AboutUs;
