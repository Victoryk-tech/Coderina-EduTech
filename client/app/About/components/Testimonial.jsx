import { Box, CardContent, Container, Stack, Typography } from "@mui/material";
import React from "react";
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

const Testimonial = ({ lego }) => {
  const impactNums = [
    {
      text: "This platform has completely transformed how we manage our projects. The intuitive interface and robust features have saved us countless hours every week.",
      name: "Emily Thompson",
      job: "Intern",
      img: gBill,
    },
    {
      text: "This platform has completely transformed how we manage our projects. The intuitive interface and robust features have saved us countless hours every week.",
      name: "Emily Thompson",
      job: "Intern",
      img: gBill,
    },
    {
      text: "This platform has completely transformed how we manage our projects. The intuitive interface and robust features have saved us countless hours every week.",
      name: "Emily Thompson",
      job: "Intern",
      img: gBill,
    },
    {
      text: "This platform has completely transformed how we manage our projects. The intuitive interface and robust features have saved us countless hours every week.",
      name: "Emily Thompson",
      job: "Intern",
      img: gBill,
    },
    {
      text: "This platform has completely transformed how we manage our projects. The intuitive interface and robust features have saved us countless hours every week.",
      name: "Emily Thompson",
      job: "Intern",
      img: gBill,
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
    <div className="impact__carousel bg-transparent font-Geist overflow-hidden ">
      <Slider {...settings} slidesToShow={5}>
        {impactNums.map((slide, index) => (
          <div
            key={index}
            className="h-[26vh] md:h-[50vh] bg-[#FFF5E5] p-1 w-[400px]"
          >
            <div className="bg-white p-3 rounded-lg">
              <p className="text-[13px] md:text-[12.4px]">{slide.text}</p>

              <div className="flex items-center justify-start space-x-2 mt-12">
                <Image
                  width={{ xs: "16px", md: "24px" }}
                  className="w-[20px] h-[24px]"
                  src={slide.img}
                  alt="slider"
                />
                <div>
                  <p className="text-[13px] md:text-sm">{slide.name}</p>
                  <p className="text-[13px] md:text-sm">{slide.job}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
