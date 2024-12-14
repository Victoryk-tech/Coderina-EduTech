"use client";
import { Box, Container, Stack } from "@mui/material";
import React from "react";
import EventBody from "./components/EventBody";
import { blackColor, pinkBg, whiteBg } from "../utils/constants";

import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import SubscribeForm from "../Home/SubscribeForm";

const Events = () => {
  const eventContent = [
    {
      color: pinkBg,
      section: <EventBody />,
    },
    {
      section: <SubscribeForm />,
    },
  ];

  return (
    <Box overflow={"hidden"}>
      {eventContent.map(({ color, section }, index) => (
        <Box p={4} key={`${section}-${index}`} bgcolor={color}>
          <Container maxWidth="xl">{section}</Container>
          <Footer />
        </Box>
      ))}
    </Box>
  );
};

export default Events;
