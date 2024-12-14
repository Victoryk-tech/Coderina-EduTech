"use client";

import { Box, Container } from "@mui/material";
import React from "react";
import LegoHeader from "./components/LegoHeader";
import { blackColor, pinkBg, pinkBgR, whiteColor } from "../utils/constants";

import LegoCard1 from "./components/LegoCard1";
import LegoCard2 from "./components/LegoCard2";
import LegoPrograms from "./components/LegoPrograms";
import LegoImpact from "./components/LegoImpact";
import LegoCard3 from "./components/LegoCard3";
import Resources from "./components/Resources";
import Footer from "../Home/Footer";

const FirstLego = () => {
  const legoContent = [
    {
      color: whiteColor,
      section: <LegoHeader />,
    },
    {
      color: pinkBgR,
      section: <LegoCard1 />,
    },
    {
      color: pinkBg,
      section: <LegoCard2 />,
    },
    {
      section: <LegoPrograms />,
    },
    {
      color: pinkBgR,
      section: <LegoImpact />,
    },
    {
      color: pinkBg,
      section: <LegoCard3 />,
    },
  ];

  return (
    <Box className="first__lego">
      {legoContent.map(({ color, section }, index) => (
        <Box p={4} key={`${section}-${index}`} bgcolor={color}>
          <Container maxWidth="xl">{section}</Container>
          <Footer />
        </Box>
      ))}
    </Box>
  );
};

export default FirstLego;

// https://youtu.be/i52coAkhX8g
