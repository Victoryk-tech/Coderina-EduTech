import { Box, Typography } from "@mui/material";
import React from "react";
import ImpactSlider from "./ImpactSlider";
import CoreValues from "./CoreValues";
import Empowering from "./Empowering";
import Scope from "./Scope";
import Alignment from "./Alignment";

const Impact = () => {
  return (
    <div className=" bg-black text-white px-2 md:px-4 lg:px-8 py-16 ">
      <h4 className="text-[24px] md:text-[40px] pb-14">Our impact so far</h4>
      <ImpactSlider />
      <CoreValues />
      <Empowering />
      <Alignment />
    </div>
  );
};

export default Impact;
