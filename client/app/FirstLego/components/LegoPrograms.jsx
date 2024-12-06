import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import legoDiscover from "../../../public/lego-discover.png";
import legoExplore from "../../../public/lego-explore.png";
import legoChallenge from "../../../public/lego-challenge.png";
import legoTech from "../../../public/lego-tech.png";
import Grid from "@mui/material/Grid2";

const LegoPrograms = () => {
  const legoLeagues = [
    {
      img: legoDiscover,
      description:
        "For children ages 4-6, this playful introductory STEM program ignites their natural curiosity and builds their habits of learning with hands-on activities in the classroom and at home using LEGO® DUPLO® bricks.",
    },
    {
      img: legoExplore,
      description:
        "In Explore, teams of students ages 6-10 focus on the fundamentals of engineering as they explore real-world problems, learn to design, and code and create unique solutions made with LEGO bricks and powered by LEGO® Education WeDo 2.0.",
    },
    {
      img: legoChallenge,
      description:
        "Friendly competition is at the heart of Challenge, as teams of students ages 9-16* engage in research, problem-solving, coding, and engineering - building and programming a LEGO robot that navigates the missions of a robot game.",
    },
    {
      img: legoTech,
      description:
        "FIRST Tech Challenge students learn to think like engineers. Teams design, build, and code robots to compete in an alliance format against other teams. Robots are built from a reusable platform, powered by Android technology.",
    },
  ];

  return (
    <Box className="lego__program">
      <Typography variant="h4" fontSize={{ xs: "24px", md: "36px" }}>
        FIRST LEGO League Programs
      </Typography>
      <Grid container>
        {legoLeagues.map((league, i) => (
          <Grid key={i} size={{ xs: 12, sm: 5.8, md: 2.85 }}>
            <Stack>
              <Box component={"img"} src={league.img} alt="" />
              <Typography>{league.description}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LegoPrograms;
