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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Box overflow={"hidden"}>
      <Slider
        ref={slider}
        className="   gap-[20rem] max-w-[530px]"
        {...settings}
      >
        {upCard.map((card, i) => (
          <Card key={i} className=" bg-[#201e1e] rounded-2xl max-w-[510px]">
            <CardContent>
              <Stack className="flex flex-row text-white pl-5 gap-[2rem] relative">
                <Stack bgcolor={card.color}></Stack>
                <Stack className="upcomingSec__grid">
                  <Stack color={card.color}>
                    <Typography>
                      <AiOutlineCalendar />
                      {card.date}
                    </Typography>
                    <Typography>
                      <TbClockHour3 />
                      {card.time}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      variant="h6"
                      fontSize={{ xs: "24px", md: "30px" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography>{card.location}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default UpSlider;
