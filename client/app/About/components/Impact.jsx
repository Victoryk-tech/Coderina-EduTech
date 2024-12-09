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
import gBill from "../../../public/green-bill.png";
import Image from "next/image";
import Team from "./Team";

const Impact = ({ lego }) => {
  const impactNums = [
    {
      number: "28,372",
      text: (
        <>
          Number of <br />
          Students trained
        </>
      ),
      img: gSmile,
    },
    {
      number: "7,362",
      text: (
        <>
          Number of <br /> Teachers trained
        </>
      ),
      img: gPerson,
    },
    {
      number: "12",
      text: "Number of Governments & Ministry Relationships",
      img: gBank,
    },
    {
      number: "16",
      text: (
        <>
          Number of <br />
          Partnerships{" "}
        </>
      ),
      img: gHandShake,
    },
    {
      number: "64",
      text: (
        <>
          New Businesses <br /> Incubated
        </>
      ),
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

  return <div></div>;
};

export default Impact;
