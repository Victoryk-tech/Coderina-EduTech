import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import CustomButton from "../../Home/CustomButton";
import legoCard from "../../../public/lego-card1.png";
import Image from "next/image";

const LegoCard1 = () => {
  return (
    <Grid container className="lego__card py-6 md:py-10 px-2 md:px-4 lg:px-16">
      <Grid size={{ xs: 12, md: 5.6 }}>
        <Typography variant="h4" fontSize={{ xs: "24px", md: "36px" }}>
          FIRST® LEGO® League guides youth through STEM learning and exploration
          at an early age.{" "}
        </Typography>
        <Typography fontSize={{ xs: "14px", md: "17px" }}>
          From Discover, to Explore, and then to Challenge, students will
          understand the basics of STEM and apply their skills in an exciting
          competition while building habits of learning, confidence, and
          teamwork skills along the way.
        </Typography>
        <CustomButton orange bold>
          Let`s go!
        </CustomButton>
      </Grid>
      <Grid size={{ xs: 12, md: 5.4 }}>
        <Image src={legoCard} alt="lego" />
      </Grid>
    </Grid>
  );
};

export default LegoCard1;
