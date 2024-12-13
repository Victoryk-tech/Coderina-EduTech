import React from "react";

import Grid from "@mui/material/Grid2";
import { Stack, Typography } from "@mui/material";
import { Input } from "antd";
import CustomButton from "./CustomButton";
import Link from "next/link";
const SubscribeForm = ({ register, link }) => {
  if (register)
    return (
      <Stack className="partner__signup" direction={"row"} p={4}>
        <Typography fontSize={{ xs: "14px", md: "21px" }}>
          Fill out the form to register
        </Typography>
        <Link href="/">
          <CustomButton bold disabled>
            Get Started
          </CustomButton>
        </Link>
      </Stack>
    );
  else
    return (
      <div
        container
        className=" w-full  bg-[#00a859] font-Geist p-5 text-[#fff] flex flex-col md:flex-row items-center justify-between mb-8 rounded-2xl gap-y-4 md:gap-y-0 md:gap-x-8 mt-4"
      >
        <div className="w-full md:w-[40%]">
          <h4 className="text-[26px] md:text-[26px]">
            Sign up for our Newsletter to receive news and updates.
          </h4>
        </div>
        <div className="w-full">
          <form
            action="submit"
            className="w-full flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-3 md:gap-y-0 md:gap-x-4 "
          >
            <Input
              type="email"
              placeholder="Enter email address"
              className="w-full py-2 md:w-[50%] placeholder:text-[#727272]"
            />
            <button className=" bg-[#FBB12F] text-black w-full py-2  rounded-3xl md:w-[20%] md:py-2 text-[16px]">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    );
};

export default SubscribeForm;
