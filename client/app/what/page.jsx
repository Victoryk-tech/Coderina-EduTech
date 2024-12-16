"use client";

import React from "react";

import { Box, Container } from "@mui/material";

import { blackColor, pinkBg } from "../utils/constants";
import WhatBody from "./WhatBody";
import Subscribers from "../Home/Subscribers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Home/Footer";
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
    <>
      <div className="px-2 md:px-4 lg:px-16">
        {whatWedoContent.map(({ color, section }, index) => (
          <div className="p-4" key={`${section}-${index}`} bgcolor={color}>
            <div>{section}</div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Page;
