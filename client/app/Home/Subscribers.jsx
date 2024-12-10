import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import Image from "next/image";
import newsLgImg from "../../public/news-ImgLg.png";

import sap from "../../public/Sap.png";
import first from "../../public/first.png";
import cater from "../../public/Caterpillar.png";
import dow from "../../public/Dow.png";
import fme from "../../public/FME.png";
import lego from "../../public/Lego.png";
import legoi from "../../public/lego-icon.png";
import ford from "../../public/Ford.png";
import nln from "../../public/NLN.png";
import nitda from "../../public/NITDA.png";
import uol from "../../public/UOL.png";
import Grid from "@mui/material/Grid2";
import SubscribeForm from "./SubscribeForm";

const Subscribers = ({ sponsor }) => {
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

  if (sponsor)
    return (
      <Box className="partner__container sec__container">
        <Stack className="partner__card">
          <Grid container sx={{ p: "0 8em" }}>
            {legoLogos.map((logo, index) => (
              <Grid key={i} size={{ xs: 12, md: 2 }}>
                <Image src={logo} alt="Partner logo" />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    );
  else
    return (
      <div className="w-full px-2 md:px-6 lg:px-16 py-6 bg-[#FFF5E5] ">
        <div className="flex flex-col items-center justify-center space-y-10">
          <p>In collaboration with our valued partners</p>

          <div className="flex items-center justify-center space-x-5 ">
            {partnerLogos.map((logos, index) => (
              <div key={index} className="w-[6rem] h-[6rem]">
                <Image
                  src={logos}
                  alt="Partner logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <CustomButton bold disabled>
              Partner with Us
            </CustomButton>
            <CustomButton bold disabled>
              Become a Sponsor
            </CustomButton>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between rounded-2xl md:mt-16 lg:px-10 py-8 bg-white">
          <div>
            <h2>
              Looking for a co-working space or where to host your meeting or
              training?
            </h2>

            <ul className="space-y-3 mt-4">
              <li> Opening Hours: Monday to Friday 9:00 AM - 5:00 PM</li>
              <li> High-Speed Internet Service</li>
              <li> Co office space / Co-working space</li>
              <li> Serviced Office / Office Rental Meeting</li>
              <li>Venue / Seminar / Workshop</li>
            </ul>

            <div className="flex items-center space-x-6 mt-8">
              <CustomButton bold disabled>
                Book Space
              </CustomButton>
              <CustomButton bold disabled>
                Book STEM classes
              </CustomButton>
            </div>
          </div>
          <div className="w-full md:w-[500px] h-[380px]">
            <Image
              src={newsLgImg}
              alt="image"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
        <SubscribeForm />
      </div>
    );
};

export default Subscribers;
