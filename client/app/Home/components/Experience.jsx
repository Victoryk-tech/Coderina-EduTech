import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import CustomButton from "./CustomButton";
import expCard1 from "../../../public/experience-card1.png";
import expCard2 from "../../../public/experience-card2.png";
import { greenBg2, pinkBgR, textColor } from "../../utils/constants";
import Image from "next/image";

const Experience = () => {
  const expCard = [
    {
      title: "Our Job Readiness Programs",
      text: [
        "Full Stack Web design (6 Months)",
        "Zero - Full Stack App Development",
        "JAVA, HTML and Python",
        "Software Testing and Certification",
        "Mentoring",
      ],
      textType: "li",
      divType: "ul",
      button: "Register",
      color: greenBg2,
      image: expCard2,
    },
    {
      title: "Bring the STEAM Experience to Your Next Celebration!",
      text: [
        "Looking for something different to celebrate your child's birthday? Coderina provides a totally unique party experience with interactive elements that really engage the kids.",
      ],
      textType: "span",
      button: "Contact us",
      color: pinkBgR,
      image: expCard1,
    },
  ];

  return (
    <Box className="exp__container">
      <Grid container>
        {expCard.map((card, i) => (
          <Grid key={i} bgcolor={card.color} size={{ xs: 12, md: 5.9 }}>
            <Container maxWidth={"sm"} className="exp__card">
              <Stack>
                <Typography variant="h4" fontSize={{ xs: "20px", md: "29px" }}>
                  {card.title}
                </Typography>
                <Stack component={card.divType}>
                  {card.text.map((t, i) => (
                    <Typography
                      fontSize={{ xs: "14px", md: "17px" }}
                      component={card.textType}
                      color={textColor}
                      key={i}
                    >
                      {t}
                    </Typography>
                  ))}
                </Stack>
                <CustomButton>{card.button}</CustomButton>
              </Stack>
              <Card>
                <Card>
                  <Image
                    src={card.image}
                    className="w-full h-full object-contain"
                    alt=""
                    //style={{ objectFit: "cover" }}
                  />
                </Card>
              </Card>
            </Container>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Experience;

{
  /* <Grid bgcolor={"red"} size={{ xs: 12, md: 6 }}>
        <Stack>
        <Typography></Typography>
            <Typography></Typography>
            </Stack>
            <CustomButton></CustomButton>
            <Card>
            <CardMedia component="img" image='' />
            </Card>
            </Grid>
            <Grid bgcolor={"green"} size={{ xs: 12, md: 6 }}>
            <Container maxWidth="sm">dd</Container>
            </Grid> */
}
