import React, { useEffect, useState } from "react";
import { Box, Container, IconButton, Stack } from "@mui/material";
import logo from "../../../public/coderinaLogo.png";
import Link from "next/link";

import CustomButton from "./CustomButton";
import { whiteBg } from "../../utils/constants";
import SideBar from "./SideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
const Navbar = () => {
  // const [noBg, addBg] = useState("navTwo");
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
        setNoBg("rgba(0, 0, 0, 0.8)");
      } else {
        setNoBg("transparent");
      }
    };

    window.addEventListener("scroll", addBgColor);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", addBgColor);
  }, []);

  return (
    <Box component={"nav"} className="nav__body" bgcolor={noBg}>
      <Container maxWidth="xl">
        <Stack className="nav__container">
          <Link href="/">
            <Image src={logo} alt="Coderina Logo" />
          </Link>
          <Stack display={{ xs: "none", md: "flex" }}>
            {links.map(({ label, path }, index) => (
              <Link href={path} key={`${label}-${index}`}>
                {label}
              </Link>
            ))}
          </Stack>
          <CustomButton
            orange
            bold
            stlyes={{
              display: { xs: "none", md: "flex" },
            }}
          >
            Get Involved
          </CustomButton>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            // size={"medium"}
            onClick={() => setIsDrawerOpen(true)}
          >
            <GiHamburgerMenu />
          </IconButton>
        </Stack>
      </Container>
      <SideBar
        isOpen={isDrawerOpen}
        handleClose={() => setIsDrawerOpen(false)}
        Links={links}
      />
    </Box>
  );
};

export default Navbar;
