import { Box, Typography } from "@mui/material";
import React from "react";
import ImpactSlider from "../../About/components/ImpactSlider";

const LegoImpact = () => {
  return (
    <div className="aboutImpact__container lego__impact text-black font-Geist md:mt-10">
      <h4 className="text-black font-medium">
        Inspiring Generations of Global Citizens and Helping Them Realize Their
        Power to Build a Better Future
      </h4>
      <ImpactSlider />
    </div>
  );
};

export default LegoImpact;
