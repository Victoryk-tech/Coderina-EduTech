"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import activeImg from "../../public/activityImg.png";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const Activities = () => {
  const textContent1 = [
    "Coderina Project Fair",
    "Coderina® University Challenge (COUCH)",
  ];
  const textContent2 = [
    "Africa Code Week",
    "Google CS-First",
    "Information and Resource Center for Research",
  ];
  const textContent3 = [
    "CPPD for Teachers",
    "Job Readiness Program",
    "Zero - Full Stack",
  ];

  return (
    <Box className="activity__container px-2 md:px-4 lg:px-16 flex flex-col space-y-5 mt-5 sec__container">
      <Typography variant="h5" fontSize={{ xs: "20px", md: "40px" }}>
        Our Programs, Projects and Initiatives
      </Typography>
      <Stack>
        <Grid container className="activity__cards">
          <Grid size={{ xs: 12, sm: 5.8, md: 5.9 }} className="activity__grid ">
            <Card className="relative w-full">
              <Image className="w-full" src={activeImg} alt="name" />

              <h1 className="absolute bottom-4 px-2 font-bold text-[16px]">
                FIRST LEGO League Programs
              </h1>
            </Card>

            <Card>
              <CardContent>
                <Stack gap={2}>
                  <Typography variant="h6">Other Programs</Typography>
                  {textContent1.map((text1) => (
                    <Typography
                      fontSize={{ xs: "18px", md: "20px" }}
                      key={text1}
                    >
                      {text1}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 5.8, md: 5.9 }} className="activity__grid">
            <Card>
              <CardContent>
                <Stack gap={2}>
                  <Typography variant="h6">Projects</Typography>
                  {textContent2.map((text2) => (
                    <Typography
                      fontSize={{ xs: "18px", md: "20px" }}
                      key={text2}
                    >
                      {text2}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Stack gap={1}>
                  <Typography variant="h6">Initiatives</Typography>
                  {textContent3.map((text3) => (
                    <Typography
                      fontSize={{ xs: "18px", md: "20px" }}
                      key={text3}
                    >
                      {text3}
                    </Typography>
                  ))}
                </Stack>
                <Link href="">
                  See other iniatives <FaArrowRightLong />
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Activities;
