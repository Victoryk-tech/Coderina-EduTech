import React from "react";

import { Box, CardContent, Container, Stack, Typography } from "@mui/material";

import Slider from "react-slick";
import personStar from "../../../public/person-star.svg";
import smile from "../../../public/smile.svg";
import robot from "../../../public/robot.svg";
import plant from "../../../public/plant.svg";
import gSmile from "../../../public/green-smile.png";
import gPerson from "../../../public/green-person.png";
import gBank from "../../../public/green-bank.png";
import gHandShake from "../../../public/green-shake.png";
import gBill from "../../../public/Itemss.png";
import Image from "next/image";

const LegoImpact = () => {
  const impactNums = [
    {
      text: "5,600",
      name: "Teachers trained",

      img: personStar,
    },
    {
      text: "12,749",
      name: "Students Impacted",

      img: smile,
    },
    {
      text: "1,185",
      name: "Robots Built",

      img: robot,
    },
    {
      text: "26",
      name: "Projects Incubated",

      img: robot,
    },
  ];

  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="px-2 md:px-4 lg:px-16 aboutImpact__container lego__impact bg-[#FDEFD9] text-black font-Geist py-10">
      <h4 className="text-black font-medium ">
        Inspiring Generations of Global Citizens and Helping Them Realize Their
        Power to Build a Better Future
      </h4>

      <div className="impact__carousel bg-transparent font-Geist overflow-hidden ">
        <Slider {...settings} slidesToShow={4}>
          {impactNums.map((slide, index) => (
            <div
              key={index}
              className="h-[26vh] md:h-[35vh] bg-[#FFF9F0] p-5 w-[400px] border-r-[1px] border-[#FAD9A0]"
            >
              <div className=" text-black">
                <Image
                  width={{ xs: "16px", md: "24px" }}
                  className="w-[20px] h-[24px]"
                  src={slide.img}
                  alt="slider"
                />

                <div className="flex flex-col items-start justify-start space-y-2 mt-12">
                  <p className="text-3xl md:text-[37px] font-semibold">
                    {slide.text}
                  </p>
                  <p className="text-[16px] font-medium">{slide.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LegoImpact;
