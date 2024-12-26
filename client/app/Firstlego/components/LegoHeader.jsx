import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../../Home/CustomButton";
import ReactPlayer from "react-player";

const LegoHeader = () => {
  return (
    <Box className="lego__header px-2 md:px-4 lg:px-16 md:pt-20">
      <Stack>
        <Typography variant="h4" width={{ xs: "100%", md: "60%" }}>
          Engaging Youth in STEM Exploration with FIRST® LEGO® League
        </Typography>
        <CustomButton isLarge>Get Started</CustomButton>
      </Stack>
      <Stack>
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          url={"https://youtu.be/i52coAkhX8g"}
        />
      </Stack>
    </Box>
  );
};

export default LegoHeader;
