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

  const legoImpact = [
    {
      number: "5,600",
      text: "Teachers trained",
      img: personStar,
    },
    {
      number: "12,749",
      text: "Students Impacted",
      img: smile,
    },
    {
      number: "1,185",
      text: "Robots Built",
      img: robot,
    },
    {
      number: "26",
      text: "Projects Incubated",
      img: plant,
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

  if (lego)
    return (
      <Container maxWidth="lg">
        <Box overflow={"hidden"} className="impact__carousel">
          <Slider {...settings} slidesToShow={4}>
            {legoImpact.map((slide, index) => (
              <CardContent
                key={index}
                className="impact__card"
                sx={{
                  bgcolor: "#FFF9F0",
                  borderRight: "1px solid #E69F22",
                  height: { xs: "26vh", md: "34vh" },
                }}
              >
                <Image src={slide.img} alt="slide" />
                <Stack>
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "40px", md: "50px" }}
                  >
                    {slide.number}
                  </Typography>
                  <Typography fontSize={{ xs: "14px", md: "16px" }}>
                    {slide.text}
                  </Typography>
                </Stack>
              </CardContent>
            ))}
          </Slider>
        </Box>
      </Container>
    );
  return (
    <Box
      overflow={"hidden"}
      className="impact__carousel bg-white font-Geist"
      border={"1px solid #3D3D3D"}
    >
      <Slider {...settings} slidesToShow={5}>
        {impactNums.map((slide, index) => (
          <CardContent
            key={index}
            className="impact__card "
            sx={{
              bgcolor: "fff",
              borderRight: "1px solid #3D3D3D",
              height: { xs: "45vh", md: "50vh" },
            }}
          >
            <Stack>
              <Typography className="text-13px md:text-16px">
                {slide.text}
              </Typography>
            </Stack>
            <div className="flex items-start justify-start space-x-2 mt-5">
              <Image
                width={{ xs: "16px", md: "24px" }}
                className="w-[20px] h-[24px]"
                src={slide.img}
                alt="slider"
              />
              <Stack>
                <Typography fontSize={{ xs: "13px", md: "16px" }}>
                  {slide.name}
                </Typography>
                <Typography fontSize={{ xs: "13px", md: "16px" }}>
                  {slide.job}
                </Typography>
              </Stack>
            </div>
          </CardContent>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonial;
