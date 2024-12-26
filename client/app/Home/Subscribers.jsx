"use client";

import React from "react";
import Slider from "react-slick";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import Image from "next/image";

import sap from "../../public/Sap.png";
import first from "../../public/first.png";
import cater from "../../public/Caterpillar.png";
import dow from "../../public/Dow.png";
import fme from "../../public/FME.png";
import lego from "../../public/Lego.png";
import legoi from "../../public/lego-icon.png";
import ford from "../../public/Ford.png";
import nln from "../../public/NLN.png";
import nitda from "../../public/NITDA.png";
import uol from "../../public/UOL.png";
import SubscribeForm from "./SubscribeForm";
import Space from "./Space";
import Sponsors from "./Sponsors";

const Subscribers = () => {
  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full font-Geist px-2 md:px-4 lg:px-16 py-8 bg-[#FFF5E5]">
      <Sponsors />
      <Space />
      <SubscribeForm />
    </div>
  );
};

export default Subscribers;
