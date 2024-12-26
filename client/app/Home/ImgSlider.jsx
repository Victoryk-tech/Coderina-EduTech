import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide from "../../public/image.png";
import slide1 from "../../public/image1.png";
import slide2 from "../../public/image2.png";
import slide3 from "../../public/image3.png";
import { Box, Stack } from "@mui/material";
import Image from "next/image";

const ImgSlider = () => {
  const slideImg = [slide, slide1, slide2, slide3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds interval
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    <div>
      <Slider className="" {...settings}>
        {slideImg.map((slide, index) => (
          <div key={index} className="w-full flex md:w-[98%]">
            <Image
              src={slide}
              alt="slideImage"
              className="w-full object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImgSlider;
