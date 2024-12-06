import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import sap from "../../../public/Sap.png";
import first from "../../../public/first.png";
import cater from "../../../public/Caterpillar.png";
import dow from "../../../public/Dow.png";
import fme from "../../../public/FME.png";
import lego from "../../../public/Lego.png";
import legoi from "../../../public/lego-icon.png";
import ford from "../../../public/Ford.png";
import nln from "../../../public/NLN.png";
import nitda from "../../../public/NITDA.png";
import uol from "../../../public/UOL.png";
import CustomButton from "./CustomButton";
import Grid from "@mui/material/Grid2";
import Subscribe from "./Subscribe";
import newsLgImg from "../../../public/news-ImgLg.png";
import Resources from "../../FirstLego/components/Resources";
import Image from "next/image";

const Partners = ({ sponsor }) => {
  const partnerLogos = [
    sap,
    first,
    cater,
    dow,
    fme,
    lego,
    ford,
    nln,
    nitda,
    uol,
  ];

  const legoLogos = [sap, first, legoi, lego];

  const newsLgCard = [
    "Opening Hours: Monday to Friday 9:00 AM - 5:00 PM",
    "High-Speed Internet Service",
    "Co office space / Co-working space",
    "Serviced Office / Office Rental Meeting",
    "Venue / Seminar / Workshop",
  ];

  if (sponsor)
    return (
      <Box className="partner__container sec__container">
        <Resources />
        <Stack className="partner__card">
          <Grid container sx={{ p: "0 8em" }}>
            {legoLogos.map((logo, index) => (
              <Grid key={index} size={{ xs: 12, md: 2 }}>
                <Image src={logo} alt="Partner logo" />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Subscribe />
      </Box>
    );
  else
    return (
      <Box className="partner__container sec__container">
        <Typography>In collaboration with our valued partners</Typography>
        <Stack className="partner__card">
          <Grid container>
            {partnerLogos.map((logo) => (
              <Grid key={logo} size={{ xs: 12, md: 1.6 }}>
                <Image src={logo} alt="Partner logo" />
              </Grid>
            ))}
          </Grid>
          <Stack>
            <CustomButton>Partner with us</CustomButton>
            <CustomButton>Become a Sponsor</CustomButton>
          </Stack>
        </Stack>
        <Stack className="news__lgCard">
          <Grid container>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4">
                Looking for a co-working space or where to host your meeting or
                training?
              </Typography>
              <Stack>
                {newsLgCard.map((list) => (
                  <Typography component={"li"} key={list}>
                    {list}
                  </Typography>
                ))}
              </Stack>
              <Stack>
                <CustomButton>Book Space</CustomButton>
                <CustomButton orange bold>
                  Book STEAM Classes
                </CustomButton>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Image src={newsLgImg} alt="newsLgImg" />
            </Grid>
          </Grid>
        </Stack>
        <Subscribe />
      </Box>
    );
};

export default Partners;
