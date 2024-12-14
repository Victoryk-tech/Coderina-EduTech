import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Input, Spin } from "antd";
import CustomButton from "./CustomButton";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const SubscribeForm = ({ register }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        // setMessage("Successfully subscribed!");
        toast.success("Successfully subscribed!");
        setEmail(""); // Clear input
      } else {
        // setMessage(data.error || "Subscription failed.");
        toast.error(data.error || "Subscription failed.");
      }
    } catch (error) {
      // setMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
      console.error("Subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (register) {
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
  } else {
    return (
      <div className="w-full bg-[#00a859] font-Geist p-5 text-[#fff] flex flex-col md:flex-row items-center justify-between mb-8 rounded-2xl gap-y-4 md:gap-y-0 md:gap-x-8 mt-4">
        <div className="w-full md:w-[50%]">
          <h4 className="text-[26px] md:text-[26px]">
            Sign up for our Newsletter to receive news and updates.
          </h4>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubscribe}
            className="w-full flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-3 md:gap-y-0 md:gap-x-4"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full py-2 md:w-[50%] placeholder:text-[#727272] outline-none"
            />
            <button
              className="bg-[#FBB12F] text-black w-full py-2 rounded-3xl md:w-[20%] md:py-2 text-[16px]"
              disabled={loading}
            >
              {loading ? <Spin size="small" /> : "Subscribe"}
            </button>
            <Toaster />
          </form>
          {/* {message && (
            <Typography
              mt={2}
              color={message.startsWith("Success") ? "green" : "red"}
            >
              {message}
            </Typography>
          )} */}
        </div>
      </div>
    );
  }
};

export default SubscribeForm;
