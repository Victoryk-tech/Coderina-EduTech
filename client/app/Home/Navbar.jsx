import React, { useEffect, useState } from "react";

import logo from "../../public/coderinaLogo.png";
import Link from "next/link";

import { whiteBg } from "../utils/constants";

import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import CustomButton from "./CustomButton";
import SideBar from "./SideBar";

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
      if (window.scrollY >= 10) {
        setNoBg("#ffffff");
      } else {
        setNoBg("transparent");
      }
    };

    window.addEventListener("scroll", addBgColor);

    // Cleanup on unmount
    return () => window.addEventListener("scroll", addBgColor);
  }, []);

  return (
    <div
      className="sticky top-0 z-50  flex items-center justify-center px-2 md:px-4 py-6 lg:py-8 w-full   "
      style={{
        backgroundColor: noBg,
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="">
          <Image
            src={logo}
            alt="coderinalogo"
            className=" object-cover w-[130px]"
          />
        </Link>

        {/* <nav className="hidden md:flex items-center justify-center space-x-8 text-[16px] font-normal">
          <Link href="/About">About us</Link>
          <Link href="/what">What we do</Link>
          <Link href="/Events">Events</Link>
          <Link href="/Media">Media</Link>
        </nav> */}
        <nav className="hidden md:flex items-center justify-center space-x-8 text-[16px] font-normal">
          {links.map(({ label, path }, index) => (
            <Link key={`${label}-${index}`} href={path}>
              {label}
            </Link>
          ))}
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

          <SideBar
            isOpen={isDrawerOpen}
            handleClose={() => setIsDrawerOpen(false)}
            Links={links}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
