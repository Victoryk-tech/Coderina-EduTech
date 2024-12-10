import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbClockHour3 } from "react-icons/tb";

const UpSlider = ({ slider }) => {
  const upCard = [
    {
      color: "#9AEFC7",
      date: "Jul 27, 2021",
      title: "STEAM Classes",
      time: "8:00 am - 5:00 pm",
      location:
        "National Library of Nigeria Plot 274, Central Business District,, Abuja Book Classes here https://coderina.org/SCHEDULE/",
    },
    {
      color: "#A6E5FC",
      date: "Jul 27, 2020 - Sep 30, 2021",
      time: "8:00 am - 5:00 pm",
      title: "CPPD for Teachers",
      location: "Online Online",
    },
    {
      color: "#A6E5FC",
      date: "Aug 3, 2020",
      time: "8:00 am - 5:00 pm",
      title: "Job Readiness Programme",
      location: "Online Online",
    },
  ];

  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="overflow-hidden">
      <Slider ref={slider} className=" gap-[2rem] max-w-full" {...settings}>
        {upCard.map((card, i) => (
          <div
            key={i}
            className=" bg-[#201e1e] rounded-2xl max-w-[500px] h-[200px]"
          >
            <div className="flex flex-row text-white">
              <div
                style={{ borderColor: card.color, backgroundColor: card.color }}
                className=" border-4 h-[200px] min-w-[2.5%]  rounded-xl "
              ></div>
              <div className=" flex flex-col items-start justify-start text-white pl-10 gap-y-4 py-4">
                <div
                  style={{ color: card.color }}
                  className="flex flex-col items-start justify-start "
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <AiOutlineCalendar />
                    {card.date}
                  </div>
                  <div className="flex items-center justify-center gap-x-2">
                    <TbClockHour3 />
                    {card.time}
                  </div>
                </div>
                <div>
                  <h6 className="text-[20px] md:text-[24px]">{card.title}</h6>
                  <h3>{card.location}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UpSlider;
