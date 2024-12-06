import { Box, CardContent, Paper, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import Plant from "../../../public/plant.png";
import Load from "../../../public/loading.png";
import Repeat from "../../../public/repeat.png";
import Safe from "../../../public/safe.png";
import Locate from "../../../public/loacation.png";
import Smile from "../../../public/smile.png";
import Bulb from "../../../public/bulb.png";
import Tool from "../../../public/tool.png";
import Scope from "./Scope";
import Image from "next/image";

const AboutMV = () => {
  const mCard = [
    {
      item: "Our Mission",
      color: "#7A4F03",
      details: [
        {
          icon: Plant,
          span: "Give back and leave a lasting footprint ",
          text: "in every community we serve, creating a ripple effect of positive change.",
        },
        {
          icon: Load,
          span: "Challenge the limits of what is possible, ",
          text: "constantly pushing boundaries to achieve better educational outcomes. ",
        },
        {
          icon: Repeat,
          span: "Create and nurture a self-sustaining ecosystem ",
          text: "where students, educators, and professionals can thrive independently.",
        },
        {
          icon: Safe,
          span: "Reduce hunger and poverty ",
          text: "through education and entrepreneurial skills, building resilient communities.",
        },
      ],
    },
  ];

  const vCard = [
    {
      item: "Our Vision",
      details: [
        {
          icon: Locate,
          span: "Influence positive changes within the education sector, ",
          text: "shaping future generations through innovative learning solutions.",
        },
        {
          icon: Smile,
          span: "Bring fun into learning, ",
          text: "making education engaging and interactive for students of all ages.",
        },
        {
          icon: Bulb,
          span: "Empower teachers with 21st-century learning pedagogy, ",
          text: "equipping them with the tools they need to deliver impactful lessons.",
        },
        {
          icon: Tool,
          span: "Empower adults with the right learning and entrepreneurship tools, ",
          text: "ensuring lifelong learning and business opportunities for all.",
        },
      ],
    },
  ];

  return (
    <Box>
      <Grid container className="mvCard__container">
        {mCard.map((m, i) => (
          <Grid key={i} item xs={12} md={12}>
            <Typography variant="h4">{m.item}</Typography>
            <Grid container className="mv__card">
              {m.details.map((detail, i) => (
                <Grid item xs={12} md={2.9} key={i}>
                  <CardContent>
                    <Paper elevation={0}>
                      <Image src={detail.icon} alt="" />
                    </Paper>
                    <Typography
                      color={m.color}
                      fontSize={{ xs: "18px", md: "8px" }}
                    >
                      <Typography component={"span"}>{detail.span}</Typography>
                      {detail.text}
                    </Typography>
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
        {vCard.map((v, i) => (
          <Grid key={i} item xs={12} md={12}>
            <Typography variant="h4">{v.item}</Typography>
            <Grid container className="mv__card">
              {v.details.map((detail, i) => (
                <Grid item xs={12} md={2.9} key={i}>
                  <CardContent className="v__card">
                    <Paper elevation={0}>
                      <Image src={detail.icon} alt="" />
                    </Paper>
                    <Typography fontSize={{ xs: "18px", md: "8px" }}>
                      <Typography component={"span"}>{detail.span}</Typography>
                      {detail.text}
                    </Typography>
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
        <Scope />
      </Grid>
    </Box>
  );
};

export default AboutMV;
