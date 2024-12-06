import { Box, CardContent, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { RiMapPin3Fill } from "react-icons/ri";
import { TbClockHour3Filled } from "react-icons/tb";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMailFill } from "react-icons/ri";
import Logo from "../../../public/coderinaBgLogo.png";
import {
  blueColor,
  darkGreenColor,
  redColor,
  yellowColor,
} from "../../utils/constants";
import Image from "next/image";

const Footer = () => {
  const footerInfo = [
    {
      title: "Address",
      content: [
        <>
          <RiMapPin3Fill color={redColor} /> 4 Ngozi Okonjo Iweala way, Utako
          district
        </>,
        <>
          <RiMapPin3Fill color={redColor} /> 4 Oye Balogun St, Lekki Penninsula
          II, Lekki Lagos
        </>,
        <>
          <TbClockHour3Filled color={yellowColor} /> Mon - Fri 9.00 - 5.00
        </>,
      ],
    },
    {
      title: "Email & Phone Number",
      content: [
        <>
          <FaPhoneAlt color={darkGreenColor} /> +234 9093307353 (Call and
          WhatsApp)
        </>,
        <>
          <RiMailFill color={blueColor} /> Planning@coderina.org
        </>,
      ],
    },
  ];

  const footerRights = [
    "Privacy Policy",
    "Accessibility Statement",
    "Information",
    "Contact Us",
  ];

  return (
    <Box className="footer__card sec__container">
      <Stack className="footer__container">
        <Stack>
          <Stack
            className="footer__icons"
            direction={{ xs: "row", md: "column" }}
          >
            <Image
              src={Logo}
              alt=""
              className="object-cover w-52 h-10"
              priority
            />
            <div className="flex items-center justify-center space-x-4">
              <FaFacebookF size={24} />
              <AiFillInstagram size={24} />
              <FaYoutube size={24} />
              <FaXTwitter size={24} />
            </div>
            {/* <Stack>
              {footerIcons.map((icon) => (
                <IconButton
                  key={icon}
                  sx={{
                    width: { xs: "27px", md: "35px" },
                    height: { xs: "27px", md: "35px" },
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Stack> */}
          </Stack>
          <Stack gap={{ xs: "1em", md: "5em" }}>
            {footerInfo.map((icon, i) => (
              <Stack key={i} className="footer__info">
                <Typography variant="h6" fontSize={{ xs: "10px", md: "14px" }}>
                  {icon.title}
                </Typography>
                <Stack>
                  {Object.values(icon.content).map((content) => (
                    <Typography
                      fontSize={{ xs: "10px", md: "14px" }}
                      key={content}
                    >
                      {content}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack className="footer__copyright">
        <Stack>
          <Typography fontSize={{ xs: "5px", md: "14.5px" }}>
            Coderina - Copyright 2022
          </Typography>
          <Stack gap={{ xs: 1, md: 4 }}>
            {footerRights.map((text) => (
              <Typography fontSize={{ xs: "5px", md: "14.5px" }} key={text}>
                {text}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
