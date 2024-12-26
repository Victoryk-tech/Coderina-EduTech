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

const Sponsors = ({ sponsor }) => {
  const partnerLogos = [
    sap,
    first,
    cater,
    dow,
    fme,
    lego,
    ford,
    nln,
    nitda,
    uol,
  ];

  const legoLogos = [sap, first, legoi, lego];

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

  if (sponsor) {
    return (
      <Box className="partner__container sec__container">
        <Stack className="partner__card">
          <Slider {...settings}>
            {legoLogos.map((logo, i) => (
              <div key={i} className="p-2">
                <Image
                  src={logo}
                  alt="Partner logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </Slider>
        </Stack>
      </Box>
    );
  } else {
    return (
      <div className="w-full font-Geist px-2 md:px-4 lg:px-6 py-8 bg-[#FFF5E5]">
        <div className="flex flex-col items-center justify-center space-y-2 md:space-y-1">
          <p className="text-[16px] md:text-[24px] text-center font-normal">
            In collaboration with our valued partners
          </p>

          <div className="w-full ">
            <Slider {...settings}>
              {partnerLogos.map((logo, index) => (
                <div key={index} className="md:p-4">
                  <Image
                    src={logo}
                    alt="Partner logo"
                    className="w-[11rem] md:w-[13rem] h-[13rem] object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <CustomButton bold disabled>
              Partner with Us
            </CustomButton>
            <CustomButton bold disabled>
              Become a Sponsor
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }
};

export default Sponsors;
