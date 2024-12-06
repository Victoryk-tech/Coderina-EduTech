"use client";

import React from "react";
import { blackColor, pinkBg } from "../utils/constants";
import { Box, Container, Stack } from "@mui/material";
import Subscribe from "../Home/components/Subscribe";
import Footer from "../Home/components/Footer";
import MediaBody from "./components/MediaBody";

const Media = () => {
  const eventContent = [
    {
      color: pinkBg,
      section: <MediaBody />,
    },
    {
      color: pinkBg,
      section: <Subscribe />,
    },
    {
      color: blackColor,
      section: <Footer />,
    },
  ];

  return (
    <Box overflow={"hidden"}>
      {eventContent.map(({ color, section }) => (
        <Box p={4} key={section} bgcolor={color}>
          <Container maxWidth="xl">{section}</Container>
        </Box>
      ))}
    </Box>
  );
};

export default Media;
