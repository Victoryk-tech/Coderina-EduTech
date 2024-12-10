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
    <div className="px-2 md:px-4 lg:px-12 py-10 w-full">
      <div>
        <div className="flex items-center justify-between">
          <h5>News & Updates</h5>
          <CustomButton orange bold>
            View all <HiOutlineArrowNarrowRight size={18} />
          </CustomButton>
        </div>

        <div className=" grid md:grid-cols-4 items-center justify-between md:gap-x-3 mt-10">
          {newsCard.map((cardInfo, i) => {
            return (
              <div className="">
                <SolutionCards key={i} {...cardInfo} childern={"Sep 2, 2023"} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
