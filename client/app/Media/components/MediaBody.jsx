import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import newsImg1 from "../../../public/newsImg1.png";
import newsImg2 from "../../../public/newsImg2.png";
import newsImg3 from "../../../public/newsImg3.png";
import newsImg4 from "../../../public/newsImg4.png";
import slide from "../../../public/event-img1.png";
import slide1 from "../../../public/event-img2.png";
import slide2 from "../../../public/event-img3.png";
import slide3 from "../../../public/event-img1.png";

import Image from "next/image";
import SolutionCards from "../../Home/components/SolutionCards";
import { CiHeart } from "react-icons/ci";
import { LuMessageCircle } from "react-icons/lu";
import contentful from "contentful";
const MediaBody = () => {
  const [mediaOption, setMediaOption] = useState("News Articles");

  const newsArticles = [
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

  const gallery = [
    {
      img: slide,
      text: "Africa Code Week",
      item: "20 media items",
    },
    {
      img: slide1,
      text: "Coderina's FIRST LEGO League ",
      item: "15 media items",
    },
    {
      img: slide2,
      text: "Caterpillar Event",
      item: "28 media items",
    },
    {
      img: slide3,
      text: "Coderina® University Challenge (COUCH)",
      item: "16 media items",
    },
    {
      img: slide,
      text: "Africa Code Week",
      item: "20 media items",
    },
    {
      img: slide1,
      text: "Coderina's FIRST LEGO League ",
      item: "15 media items",
    },
    {
      img: slide2,
      text: "Caterpillar Event",
      item: "28 media items",
    },
    {
      img: slide3,
      text: "Coderina® University Challenge (COUCH)",
      item: "16 media items",
    },
  ];

  const mediaBtn = ["News Articles", "Publications", "Gallery"];

  // contentful

  return (
    <Box mt={13} className="media__container">
      <Stack justifyContent={["center", "space-between"]}>
        <Typography variant="h4">Media</Typography>
        <Stack>
          {mediaBtn.map((btn, i) => (
            <Button
              key={i}
              variant={mediaOption == btn ? "contained" : ""}
              sx={{
                bgcolor: mediaOption == btn ? "White" : "",
                fontSize: { xs: "12px", md: "14px" },
              }}
              onClick={() => {
                setMediaOption(btn);
              }}
            >
              {btn}
            </Button>
          ))}
        </Stack>
      </Stack>

      {mediaOption == "Gallery" ? (
        <Grid container className="news__cards">
          {gallery.map((newGallery, i) => (
            <SolutionCards
              key={i}
              {...newGallery}
              childern1={newGallery.item}
            />
          ))}
        </Grid>
      ) : (
        <Grid container className="news__cards">
          {newsArticles.map((newArticle, index) => (
            <SolutionCards
              key={index}
              {...newArticle}
              childern={"Sep 2, 2023"}
            />
          ))}
          {/* comment and likes section */}
          <div className="flex items-center gap-2">
            <CiHeart size={18} />
            <span className="font-semibold">0</span>
            <LuMessageCircle size={15} />
            <span className="font-semibold">0</span>
          </div>
        </Grid>
      )}
    </Box>
  );
};

export default MediaBody;
