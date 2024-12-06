"use client";

import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Select } from "@chakra-ui/react";
import Grid from "@mui/material/Grid2";
import { Input } from "antd";
import CustomButton from "../Home/components/CustomButton";

const Register = () => {
  const formInfo1 = [
    {
      title: "Contact’s First Name",
      type: "text",
      required: true,
      placeholder: "Adam",
    },
    {
      title: "Contact’s Last Name",
      type: "text",
      required: true,
      placeholder: "Smith",
    },
  ];
  const formInfo2 = [
    {
      title: "School Name",
      type: "tel",
      required: true,
      placeholder: "International School",
    },
    {
      title: "Email Address",
      type: "email",
      required: true,
      placeholder: "adamsmith@coderina.com",
    },
    {
      title: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "080 000 0000",
    },
    {
      title: "Address",
      type: "text",
      required: true,
      placeholder: "Where you live",
    },
  ];

  const formInfo3 = [
    {
      title: "Link to Website or Prototype (optional)",
      type: "text",
      required: true,
      placeholder: "Add URL",
    },
    {
      title: "Link to Documents (optional)",
      type: "text",
      required: true,
      placeholder: "Add URL",
    },
  ];

  const formDrop = [
    {
      title: "State",
      placeholder: "Abia State",
    },
    {
      title: "How did you hear about us?",
      placeholder: "Facebook",
    },
  ];

  return (
    <Box p={4}>
      <Container maxWidth="xl">
        <Stack className="register__form">
          <Grid classname="container">
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h4">
                Register for the Coderina® University Challenge (COUCH)
              </Typography>
              <Typography>Fill the form to register</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5.5 }}>
              <form action="">
                {formInfo1.map((info, i) => (
                  <Stack key={i}>
                    <Typography>{info.title}</Typography>
                    <Input
                      type={info.type}
                      placeholder={info.placeholder}
                      required={info.required}
                    />
                  </Stack>
                ))}
                <FormControl className="register__gender">
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup defaultValue="female" name="radio-buttons-group">
                    <FormControlLabel
                      value="male"
                      control={<Radio size="xs" color="" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio size="xs" color="" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio size="xs" color="" />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
                {formInfo2.map((info, i) => (
                  <Stack key={i}>
                    <Typography>{info.title}</Typography>
                    <Input
                      type={info.type}
                      placeholder={info.placeholder}
                      required={info.required}
                    />
                  </Stack>
                ))}
                {formDrop.map((info, i) => (
                  <Stack key={i} className="form__drop">
                    <Typography>{info.title}</Typography>
                    <Select
                      icon={"none"}
                      placeholder={info.placeholder}
                      required={info.required}
                    />
                  </Stack>
                ))}
                <Stack>
                  <Typography>Idea Name</Typography>
                  <Input
                    type="text"
                    placeholder="What’s your idea?"
                    required={true}
                  />
                </Stack>
                <Stack>
                  <Typography>Idea Description</Typography>
                  <textarea type="text" placeholder="What’s your idea about?" />
                </Stack>
                {formInfo3.map((info, i) => (
                  <Stack key={i}>
                    <Typography>{info.title}</Typography>
                    <Input
                      type={info.type}
                      placeholder={info.placeholder}
                      required={info.required}
                    />
                  </Stack>
                ))}
                <Stack alignItems={"end"}>
                  <CustomButton>Register</CustomButton>
                </Stack>
              </form>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;
