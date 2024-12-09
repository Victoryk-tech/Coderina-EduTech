import React from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";

const SolutionCards = ({
  img,
  text,
  childern,
  childern1,
  childern2,
  childern3,
}) => {
  return (
    <Grid size={{ xs: 12, sm: 5.8, md: 2.85 }} key={text}>
      <Card sx={{ borderRadius: {} }}>
        <Image src={img} width={"320px"} alt="" />
      </Card>
      <Typography fontSize={{ xs: "12px", md: "14px" }}>{childern}</Typography>
      <Typography fontSize={{ xs: "12px", md: "14px" }}>{childern1}</Typography>
      <Typography fontSize={{ xs: "14px", md: "16px" }}>{text}</Typography>
      <Typography fontSize={{ xs: "12px", md: "14px" }}>{childern2}</Typography>
      <Typography fontSize={{ xs: "12px", md: "14px" }}>{childern3}</Typography>
    </Grid>
  );
};

export default SolutionCards;
