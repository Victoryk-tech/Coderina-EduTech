import React from "react";
import CustomButton from "./CustomButton";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import newsImg1 from "../../public/newsImg1.png";
import newsImg2 from "../../public/newsImg2.png";
import newsImg3 from "../../public/newsImg3.png";
import newsImg4 from "../../public/newsImg4.png";
import SolutionCards from "./SolutionCards";
import Image from "next/image";
const News = () => {
  const newsCard = [
    {
      img: newsImg1,
      text: "Africa Code Week: Empowering Educators and Youth for a Digital Future",
    },
    {
      img: newsImg2,
      text: "Nigeria Embraces the Future: Robotics and AI in Basic Education",
    },
    {
      img: newsImg3,
      text: "Introducing the First Lego League Challenge Masterpiece",
    },
    {
      img: newsImg4,
      text: "Educating the Educators: Coderina's FIRST LEGO League (FLL) Explore and Discover Workshop in Nigeria",
    },
  ];
  return (
    <div className="px-2 lg:px-8 py-10 w-full font-Geist">
      <div>
        <div className="flex items-center justify-between">
          <h5>News & Updates</h5>
          <CustomButton orange bold>
            View all <HiOutlineArrowNarrowRight size={18} />
          </CustomButton>
        </div>

        <div className=" grid md:grid-cols-4 items-center justify-between gap-y-6 md:gap-x-3 mt-10">
          {newsCard.map((cardInfo, i) => {
            return (
              <div key={i} className="space-y-3 md:w-[240px] md:h-[240px]">
                <div className="w-full md:w-[260px] h-[200px]">
                  <Image
                    src={cardInfo.img}
                    alt="news"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[14px] ">sept.2023</p>
                  <h3 className="font-normal text-[15px] md:text-[16px] leading-6">
                    {cardInfo.text}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
