import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  blueColor,
  darkGreenColor,
  redColor,
  yellowColor,
} from "../../utils/constants";
import CustomButton from "./CustomButton";
import { FaArrowRightLong } from "react-icons/fa6";
import ImgSlider from "./ImgSlider";
import BGPattern from "../../../public/BGPattern.png";
import Navbar from "./Navbar";

const Header = () => {
  const tags = [
    {
      tag: "Youth. ",
    },
    {
      tag: "Innovation. ",
    },
    {
      tag: "Entrepreneurships. ",
    },
    {
      tag: "Empowerment. ",
    },
  ];

  return (
    <div>
      <Box
        className="header__container "
        // sx={{
        //   backgroundImage: `url(${BGPattern})`,
        // }}
      >
        <Stack gap={3}>
          <Stack>
            <Typography className="header__tags" width={["default", "65%"]}>
              {tags.map(({ tag, color }) => (
                <Typography
                  fontSize={{ xs: "24px", md: "50px" }}
                  component={"span"}
                  key={tag}
                  color={color}
                >
                  {tag}
                </Typography>
              ))}
            </Typography>
          </Stack>
          <Stack>
            <CustomButton isLarge>
              Get Started <FaArrowRightLong />
            </CustomButton>
          </Stack>
          <ImgSlider />
        </Stack>
      </Box>
    </div>
  );
};

export default Header;
