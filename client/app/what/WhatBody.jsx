import {
  Box,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CustomButton from "../Home/CustomButton";
import { FaArrowRightLong } from "react-icons/fa6";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import leagueImg from "../../public/lego-league.png";
import Image from "next/image";

const WhatBody = () => {
  const programs = [
    {
      title: "Coderina Project Fair",
      description:
        "This is a 48-hour event promoting innovation among tertiary students in Nigeria. Teams from diverse backgrounds collaborate to solve indigenous problems using technology or modern business approaches.",
      link: "",
    },
    {
      title: "Coderina® University Challenge (COUCH)",
      description:
        "This is an annual event where tertiary students showcase their final year projects to industry experts. The goal is to bridge the gap between academic work and industry needs, aligning student projects with real-world requirements.",
      link: "/couch",
    },
  ];

  const activities = [
    {
      md: 3.9,
      title: "Projects",
      content: [
        "Africa Code Week",
        "Google CS-First",
        "Information and Resource Center for Research",
      ],
    },
    {
      md: 7.9,
      title: "Initiatives",
      content: [
        "CPPD for Teachers",
        "Lifelong skills 2020",
        "Themed Party",
        "Virtual Tutors",
        "Zero-full Stack",
      ],
      content2: [
        "Job Readiness Program",
        "After School Program",
        "Child Innovation Awards",
        "Reverse Engineering",
      ],
    },
  ];

  return (
    <Box mt={10} className="what__container">
      <Stack>
        <Stack>
          <Typography variant="h4" width={{ xs: "100%", md: "25%" }}>
            FIRST LEGO League Programs
          </Typography>
          <Typography width={{ xs: "100%", md: "57%" }}>
            FIRST® LEGO® League introduces youth to STEM through hands-on
            learning and competition. From Discover to Challenge, students build
            STEM skills while developing confidence, teamwork, and lifelong
            learning habits.
          </Typography>

          <Link
            href="/Firstlego"
            className="bg-black flex items-center justify-between text-white rounded-3xl p-3 gap-x-3 text-sm font-medium"
          >
            {" "}
            Get Started <FaArrowRightLong />
          </Link>
        </Stack>
        <Image src={leagueImg} alt="leaqueimg" />
      </Stack>
      <Stack>
        <Paper
          elevation={1}
          className="what__paper"
          sx={{ fontSize: { xs: "12px", md: "14px" } }}
        >
          Other Programs
        </Paper>
        <Grid container>
          {programs.map(({ title, description, link }, index) => (
            <Grid key={`${title}-${index}`} size={{ xs: 12, md: 5.9 }}>
              <Typography variant="h6" fontSize={{ xs: "18px", md: "21px" }}>
                {title}
              </Typography>
              <Typography fontSize={{ xs: "14px", md: "16px" }}>
                {description}
              </Typography>
              <Link href="link">
                <Typography fontSize={{ xs: "10px", md: "16px" }}>
                  Learn More <FaArrowRightLong />
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack>
        <Grid container>
          {activities.map((active, i) => (
            <Grid key={i} size={{ xs: 12, md: active.md }}>
              <Paper
                elevation={1}
                className="what__paper"
                sx={{ fontSize: { xs: "10px", md: "14px" } }}
              >
                {active.title}
              </Paper>
              <Stack>
                <Stack>
                  {active.content.map((act, indexto) => (
                    <Typography
                      key={indexto}
                      fontSize={{ xs: "9px", md: "18px" }}
                    >
                      {act}
                    </Typography>
                  ))}
                </Stack>
                <Stack>
                  {active.content2?.map((act2, action) => (
                    <Typography
                      key={action}
                      fontSize={{ xs: "9px", md: "18px" }}
                    >
                      {act2}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default WhatBody;
