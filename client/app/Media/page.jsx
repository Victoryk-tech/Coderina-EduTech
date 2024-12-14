"use client";

import React from "react";
import { blackColor, pinkBg } from "../utils/constants";
import { Box, Container, Stack } from "@mui/material";

import MediaBody from "../Media/component/MediaBody";
import Footer from "../Home/Footer";
import SubscribeForm from "../Home/SubscribeForm";

const Media = () => {
  const eventContent = [
    {
      color: pinkBg,
      section: <MediaBody />,
    },
  ];

  return (
    <>
      <Box overflow={"hidden"}>
        {eventContent.map(({ color, section }) => (
          <Box p={4} key={section} bgcolor={color}>
            <Container maxWidth="xl">{section}</Container>
          </Box>
        ))}
      </Box>
      <div className="px-2 md:px-4 lg:px-16">
        <SubscribeForm />
      </div>
      <Footer />
    </>
  );
};

export default Media;
