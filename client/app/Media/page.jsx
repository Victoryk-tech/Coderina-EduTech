"use client";

import React from "react";
import { blackColor, pinkBg } from "../utils/constants";
import { Box, Container, Stack } from "@mui/material";

import MediaBody from "../Media/component/MediaBody";

const Media = () => {
  const eventContent = [
    {
      color: pinkBg,
      section: <MediaBody />,
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
