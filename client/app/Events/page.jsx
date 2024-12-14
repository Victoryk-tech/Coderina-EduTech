"use client";
import { Box, Container, Stack } from "@mui/material";
import React from "react";
import EventBody from "./components/EventBody";
import { blackColor, pinkBg, whiteBg } from "../utils/constants";
import Partners from "../Home/Subscribers";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

const Events = () => {
  const eventContent = [
    {
      color: whiteBg,
      section: <Navbar />,
    },
    {
      color: pinkBg,
      section: <EventBody />,
    },
    {
      color: pinkBg,
      section: <Partners />,
    },
    {
      section: <Footer />,
    },
  ];

  return (
    <Box overflow={"hidden"}>
      {eventContent.map(({ color, section }, index) => (
        <Box p={4} key={`${section}-${index}`} bgcolor={color}>
          <Container maxWidth="xl">{section}</Container>
        </Box>
      ))}
    </Box>
  );
};

export default Events;
