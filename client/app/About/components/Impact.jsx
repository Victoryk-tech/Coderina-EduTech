import { Box, Typography } from "@mui/material";
import React from "react";
import ImpactSlider from "./ImpactSlider";

const Impact = () => {
  return (
    <div className="aboutImpact__container bg-black text-white px-2 md:px-4 lg:px-8">
      <h4 className="text-[24px] md:text-[40px]">Our impact so far</h4>
      <ImpactSlider />
    </div>
  );
};

export default Impact;
