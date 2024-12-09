import React, { useEffect, useState } from "react";
import { Box, Container, IconButton, Stack } from "@mui/material";
import logo from "../../public/coderinaLogo.png";
import Link from "next/link";

import { whiteBg } from "../utils/constants";

import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const links = [
    { label: "About us", path: "/About" },
    { label: "What we do", path: "/what" },
    { label: "Events", path: "/Events" },
    { label: "Media", path: "/Media" },
  ];

  const [noBg, setNoBg] = useState("transparent");

  useEffect(() => {
    const addBgColor = () => {
      if (window.scrollY > 50) {
        setNoBg(whiteBg);
      } else {
        setNoBg("transparent");
      }
    };

    window.addEventListener("scroll", addBgColor);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", addBgColor);
  }, []);

  return (
    <div
      className=" flex items-center justify-center px-5 lg:py-8 w-full sticky top-0 bottom-0 bg-white z-[999]"
      style={{ backgroundColor: noBg }}
    >
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="">
          <Image
            src={logo}
            alt="coderinalogo"
            className=" object-cover w-[130px]"
          />
        </Link>

        <nav className="hidden md:flex items-center justify-center space-x-8 text-[16px] font-normal">
          <Link href="/about">About us</Link>
          <Link href="/what">What we do</Link>
          <Link href="/Events">Events</Link>
          <Link href="/Media">Media</Link>
        </nav>

        <CustomButton
          orange
          bold
          stlyes={{
            display: { xs: "none", md: "flex" },
          }}
        >
          Get Involved
        </CustomButton>

        <div className="md:hidden">
          <div onClick={() => setIsDrawerOpen(true)}>
            <GiHamburgerMenu />
          </div>

          {/* <SideBar
        isOpen={isDrawerOpen}
        handleClose={() => setIsDrawerOpen(false)}
        Links={links}
      /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
