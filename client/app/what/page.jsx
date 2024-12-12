"use client";

import React from "react";

import { Box, Container } from "@mui/material";

import { blackColor, pinkBg } from "../utils/constants";
import WhatBody from "./WhatBody";

const Page = () => {
  const whatWedoContent = [
    {
      color: pinkBg,
      section: <WhatBody />,
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
