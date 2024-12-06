import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide from "../../../public/image.png";
import slide1 from "../../../public/image1.png";
import slide2 from "../../../public/image2.png";
import slide3 from "../../../public/image3.png";
import { Box, Stack } from "@mui/material";
import Image from "next/image";

const ImgSlider = () => {
  const slideImg = [
    {
      image: slide,
    },
    {
      image: slide1,
    },
    {
      image: slide2,
    },
    {
      image: slide3,
    },
  ];

  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
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
    <Box>
      <Slider className="header__carousel" {...settings}>
        {slideImg.map((slide, index) => (
          <Stack key={index}>
            <Image
              src={slide.image}
              alt={`slide-${index}`}
              width={{ xs: "100%", md: "96%" }}
              height={300}
              style={{ objectFit: "cover", borderRadius: "10px" }}
              priority
            />
          </Stack>
        ))}
      </Slider>
    </Box>
  );
};

export default ImgSlider;
