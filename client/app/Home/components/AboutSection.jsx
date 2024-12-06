import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import CustomButton from "./CustomButton";
import aboutSecImg from "../../../public/aboutSec.png";
import aboutSecImg1 from "../../../public/aboutSec1.png";
import Image from "next/image";

const AboutSection = () => {
  const aboutCard = [
    {
      title: "For Student",
      description:
        "Lifelong Learning Skills Needed to thrive in the 21st century.",
      img: aboutSecImg,
    },
    {
      title: "For Teachers",
      description:
        "Continuous Personal & Professional Development Training for Teachers",
      img: aboutSecImg1,
    },
  ];

  return (
    <Box className="sec__container">
      <Stack className="aboutSec__container">
        <Stack className="aboutSec__header">
          <Typography
            variant="h5"
            fontSize={{ xs: "17px", md: "30px" }}
            width={{ xs: "100%", md: "70%" }}
          >
            Coderina is an independent Non-profit organisation Ed-Tech that
            works to promote ICT development, Youth Innovation and
            Entrepreneurship in Africa
          </Typography>
          <CustomButton>Learn About Us</CustomButton>
        </Stack>
        <Grid container className="aboutSec__grid">
          {aboutCard.map(({ title, description, img }) => (
            <Grid size={{ xs: 12, md: 6 }} key={title}>
              <Stack>
                <Typography fontSize={{ xs: "16px", md: "20px" }}>
                  {title}
                </Typography>
                <Typography fontSize={{ xs: "16px", md: "20px" }}>
                  {description}
                </Typography>
              </Stack>
              <Image src={img} alt="mage" />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default AboutSection;
