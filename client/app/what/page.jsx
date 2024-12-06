"use client";

import { Box, Container } from "@mui/material";
import React from "react";
import Partners from "../Home/components/Partners";
import Footer from "../Home/components/Footer";
import { blackColor, pinkBg } from "../utils/constants";
import WhatWedoBody from "./components/WhatWedoBody";

const WhatWedo = () => {
  const whatWedoContent = [
    {
      color: pinkBg,
      section: <WhatWedoBody />,
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
      {whatWedoContent.map(({ color, section }, index) => (
        <Box p={4} key={`${section}-${index}`} bgcolor={color}>
          <Container maxWidth="xl">{section}</Container>
        </Box>
      ))}
    </Box>
  );
};

export default WhatWedo;
