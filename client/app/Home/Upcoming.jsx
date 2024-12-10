import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { RiArrowLeftLine } from "react-icons/ri";
import UpSlider from "./UpSlider";

const Upcoming = () => {
  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };

  const previous = () => {
    sliderRef.slickPrev();
  };

  return (
    <div className="flex flex-col gap-[5rem] text-white sec__container bg-black px-2 md:px-4 lg:px-16">
      <div className="flex flex-row items-center justify-between">
        <h5 className="text-[22px] md:text-[32px]">Upcoming Events</h5>
        <div className="space-y-2">
          <div
            className="bg-white p-3 text-black rounded-2xl"
            onClick={previous}
          >
            <RiArrowLeftLine />
          </div>
          <div className="bg-white p-3 text-black rounded-2xl" onClick={next}>
            <RiArrowRightLine />
          </div>
        </div>
      </div>
      <UpSlider
        slider={(slider) => {
          sliderRef = slider;
        }}
      />
    </div>
  );
};

export default Upcoming;
