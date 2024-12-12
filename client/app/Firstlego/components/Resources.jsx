import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import edit from "../../../public/edit.png";
import pic from "../../../public/pic.png";
import set from "../../../public/setting.png";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "next/link";

const Resources = () => {
  const cardContent = [
    {
      img: edit,
      description: "Discover FIRST Tech Challenge's impact on our community",
      link: "Read Blog",
      gap: 13,
    },
    {
      img: pic,
      description: "Take a look at what FIRST Tech Challenge is all about",
      link: "View Gallery",
      gap: 18.5,
    },
    {
      img: set,
      description: "Discover FIRST Tech Challenge's impact on our community",
      link: "View Resource Library",
      gap: 13,
    },
  ];

  return (
    <Box className="resource__container">
      <Typography variant="h4" fontSize={{ xs: "22px", md: "28px" }}>
        Resources
      </Typography>
      <Stack>
        {cardContent.map((content, i) => (
          <Stack key={i} gap={content.gap}>
            <Stack>
              <img src={content.img} alt="" />
              <Typography fontSize={{ xs: "14px", md: "18px" }}>
                {content.description}
              </Typography>
            </Stack>
            <Stack>
              <Link>
                <Box fontSize={{ xs: "12px", md: "17px" }} component={"span"}>
                  {content.link}
                </Box>
                <BsArrowRight size={23} />
              </Link>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Resources;
