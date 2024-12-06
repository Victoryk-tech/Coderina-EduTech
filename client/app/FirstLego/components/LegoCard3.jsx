import { Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import CustomButton from "../../Home/components/CustomButton";
import legoCard from "../../../public/lego-card3.png";
import Image from "next/image";

const LegoCard3 = () => {
  return (
    <Grid container className="lego__card">
      <Grid size={{ xs: 12, md: 5.6 }}>
        <Typography variant="h4" fontSize={{ xs: "24px", md: "36px" }}>
          Code, Design, and Compete with Robots!
        </Typography>
        <Typography fontSize={{ xs: "14px", md: "17px" }}>
          FIRST Tech Challenge students learn to think like engineers. Teams
          design, build, and code robots to compete in an alliance format
          against other teams. Robots are built from a reusable platform,
          powered by Android technology, and can be coded using a variety of
          levels of Java-based programming.
        </Typography>
        <CustomButton bold>Start a team</CustomButton>
      </Grid>
      <Grid size={{ xs: 12, md: 5.4 }}>
        <Image src={legoCard} alt="" />
      </Grid>
    </Grid>
  );
};

export default LegoCard3;
