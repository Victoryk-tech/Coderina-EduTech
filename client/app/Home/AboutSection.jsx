import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import CustomButton from "./CustomButton";
import aboutSecImg from "../../public/aboutSec.png";
import aboutSecImg1 from "../../public/aboutSec1.png";
import Image from "next/image";
const AboutSection = () => {
  const aboutCard = [
    {
      title: "For Student",
      description:
        "Lifelong Learning Skills Needed to thrive in the 21st century.",
      img: aboutSecImg,
    },
    {
      title: "For Teachers",
      description:
        "Continuous Personal & Professional Development Training for Teachers",
      img: aboutSecImg1,
    },
  ];
  return (
    <div className="w-full px-2 md:px-4 lg:px-16 py-16">
      <div className="flex items-start justify-between">
        <h2 className="font-medium text-[32px] leading-[48px] md:w-[70%]">
          Coderina is an independent Non-profit organisation Ed-Tech that works
          to promote ICT development, Youth Innovation and Entrepreneurship in
          Africa
        </h2>

        <CustomButton>Learn About Us</CustomButton>
      </div>

      <div className="grid md:grid-cols-2 items-center justify-center md:space-x-4 mt-20 bg-[#fff5e5] p-10 rounded-2xl">
        {aboutCard.map(({ title, description, img }, index) => {
          return (
            <div key={`${title}-${index}`} className="space-y-10">
              <div>
                <h2 className="text-[16px] md:[20px]">{title}</h2>
                <h2 className="text-[16px] md:[20px]">{description}</h2>
              </div>
              <Image src={img} alt="image" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutSection;