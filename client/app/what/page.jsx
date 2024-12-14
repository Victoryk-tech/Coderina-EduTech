"use client";

import React from "react";

import { Box, Container } from "@mui/material";

import { blackColor, pinkBg } from "../utils/constants";
import WhatBody from "./WhatBody";
import Subscribers from "../Home/Subscribers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Page = () => {
  const whatWedoContent = [
    {
      color: pinkBg,
      section: <WhatBody />,
    },

    {
      color: pinkBg,
      section: <Subscribers />,
    },
  ];

  return (
    <Box className="about__us">
      {whatWedoContent.map(({ color, section }, index) => (
        <Box p={4} key={`${section}-${index}`} bgcolor={color}>
          <Container maxWidth="xl">{section}</Container>
        </Box>
      ))}
    </Box>
  );
};

export default Page;
