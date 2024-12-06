"use client";
import React from "react";
import { blackColor, pinkBg } from "../utils/constants";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import CustomButton from "../Home/components/CustomButton";
import Subscribe from "../Home/components/Subscribe";
import Footer from "../Home/components/Footer";

const Couch = () => {
  const couchInfos = [
    {
      title: "About",
      content: [
        "Coderina® University Challenge (COUCH) is an event aimed at promoting innovation among students in Tertiary education in Nigeria. A 48 hours Challenge where teams of students with diverse background and skill set come together to solve “indigenous” problems using technology or modern business approaches. The aim is to foster collaboration, network, learn and build stuff that would change the world.",
        "Objectives",
      ],
      type: "p",
      shadows: "0px 1px 0px 0px rgba(0,0,0,0.1)",
    },
    {
      title: "Objectives",
      content: [
        "Expose participants to diverse creative and innovative business opportunities",
        "To foster networking and valuable collaboration among budding entrepreneurs",
        "Stimulate creative thinking and promote innovation in Nigeria/Africa",
        "To create solutions to real-life problems/challenges in Africa/World",
        "To help students make good career decisions and gain experiential knowledge of entrepreneurship",
        "To build sustainable tech solution solving indigenous social problems in Nigeria.",
      ],
      type: "li",
      shadows: "0px 1px 0px 0px rgba(0,0,0,0.1)",
    },
    {
      title: "Challenge Focused Areas",
      content: [
        "Employment/Unemployment",
        "Agriculture",
        "Financial Inclusion",
        "Food Security",
        "Quality Education",
        "Health Care",
        "Human Security",
      ],
      type: "li",
    },
  ];

  return (
    <Box className="couch__container">
      <Box p={4} bgcolor={pinkBg}>
        <Container maxWidth="xl" className="couch__header">
          <Stack p={{ xs: "4em 1em", md: "6.5em 14em" }}>
            <Typography variant="h4" fontSize={{ xs: "18px", md: "27px" }}>
              Coderina® University Challenge (COUCH)
            </Typography>
            <Typography fontSize={{ xs: "14px", md: "16px" }}>
              A 48 hours Challenge where teams of students with diverse
              background and skill set come together to solve “indigenous”
              problems using technology or modern business approaches.{" "}
            </Typography>
            <CustomButton isLarge>Get Started</CustomButton>
          </Stack>
        </Container>
      </Box>
      <Box mt={15} mb={10}>
        <Container
          maxWidth="md"
          className="couch__info"
          sx={{ padding: { xs: "", md: "0 5em" } }}
        >
          {couchInfos.map((info, i) => (
            <Stack key={i} boxShadow={info.shadows} borderRadius={4}>
              <Typography
                variant=" h4"
                fontSize={{ xs: "16px", md: "20px" }}
                fontWeight={700}
              >
                {info.title}
              </Typography>
              <Stack>
                {info.content.map((content, id) => (
                  <Stack className="couch__text" key={id}>
                    <Typography component={info.type}></Typography>
                    <Typography fontSize={{ xs: "14px", md: "16px" }}>
                      {content}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ))}
        </Container>
      </Box>
      <Box mb={10}>
        <Container maxWidth="md">
          <Subscribe register link={"/register"} />
        </Container>
      </Box>
      <Box p={4} bgcolor={blackColor}>
        <Container maxWidth="lg">
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};

export default Couch;
