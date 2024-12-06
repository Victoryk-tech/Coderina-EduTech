import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { FaArrowRightLong } from "react-icons/fa6";
import CustomButton from "../../Home/components/CustomButton";
import memberImg from "../../../public/member-img.png";

import Image from "next/image";
import SolutionCards from "@/app/Home/components/SolutionCards";

const OurTeam = () => {
  const ourTeamCard = [
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
  ];

  return (
    <Box className="team__container">
      <Stack>
        <Typography variant="h4" fontSize={{ xs: "20px", md: "30px" }}>
          Our Team
        </Typography>
        <CustomButton>
          Volunteer with us <FaArrowRightLong />
        </CustomButton>
      </Stack>
      <Grid container className="news__cards">
        {ourTeamCard.map((teamCard, i) => (
          <SolutionCards key={i} {...teamCard} childern2="Role" />
        ))}
      </Grid>
    </Box>
  );
};

export default OurTeam;
