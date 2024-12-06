import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import scopeImg1 from "../../../public/scope-img1.png";
import scopeImg2 from "../../../public/scope-img2.png";
import scopeImg3 from "../../../public/scope-img3.png";
import scopeImg4 from "../../../public/scope-img4.png";
import SolutionCards from "@/app/Home/components/SolutionCards";
// import { details } from "framer-motion/client";

const Scope = () => {
  const scopeCards = [
    {
      img: scopeImg1,
      text: "STEAM Curriculum Development ",
      details:
        "Designing school programs that integrate coding, robotics, and problem-solving into daily learning.",
    },
    {
      img: scopeImg2,
      text: "Training for Educators",
      details:
        "Offering Continuous Personal and Professional Development Training (CPPDT) for teachers to improve their skills in virtual learning, coding, and STEAM education.",
    },
    {
      img: scopeImg3,
      text: "Project-Based Learning",
      details:
        "Guiding students in solving community challenges using robotics and AI.",
    },
    {
      img: scopeImg4,
      text: "Monitoring & Evaluation",
      details:
        "Providing expert assessments and real-time feedback to enhance project implementation and outcomes.",
    },
  ];

  return (
    <Box className="scope__container">
      <Typography variant="h4" fontSize={{ xs: "24px", md: "40px" }}>
        {" "}
        Our Services
      </Typography>
      <Grid container className="news__cards">
        {scopeCards.map((scopeCard, i) => (
          <SolutionCards key={i} {...scopeCard} childern3={scopeCard.details} />
        ))}
      </Grid>
    </Box>
  );
};

export default Scope;
