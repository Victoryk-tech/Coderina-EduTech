import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import CustomButton from "./CustomButton";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import newsImg1 from "../../../public/newsImg1.png";
import newsImg2 from "../../../public/newsImg2.png";
import newsImg3 from "../../../public/newsImg3.png";
import newsImg4 from "../../../public/newsImg4.png";
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
    <Box className="news__container sec__container">
      <Stack className="news__header">
        <Stack>
          <Typography variant="h5">News & Updates</Typography>
          <CustomButton orange bold>
            View all <HiOutlineArrowNarrowRight size={18} />
          </CustomButton>
        </Stack>
        <Grid container className="news__cards">
          {newsCard.map((cardInfo, i) => (
            <SolutionCards key={i} {...cardInfo} childern={"Sep 2, 2023"} />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default News;
