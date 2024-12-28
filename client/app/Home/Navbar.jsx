import React, { useEffect, useState } from "react";

import logo from "../../public/coderinaLogo.png";
import Link from "next/link";

import { whiteBg } from "../utils/constants";

import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import CustomButton from "./CustomButton";
import SideBar from "./SideBar";
import { usePathname, useRouter } from "next/navigation";
const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(false);
  const id = pathname.startsWith("/Media/")
    ? pathname.split("/Media/")[1]
    : null;
  const [display, setDisplay] = useState();
  const links = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/About" },
    { label: "What we do", path: "/what" },
    { label: "Events", path: "/Events" },
    { label: "Media", path: "/Media" },
  ];
  const activeLink =
    "text-[#FBB12F] flex items-center justify-center space-x-1 text-[16px] font-normal relative after:content-[''] after:bg-[#FBB12F] after:h-[4px] after:w-[100%] after:left-0 after:bottom-[-12px] after:rounded-xl after:absolute";
  const normalLink =
    "relative flex items-center justify-center space-x-1 tracking-[1px] text-[16px] font-normal leading-[20px] hover:text-[#6b4343] after:content-[''] after:bg-[#FBB12F] after:h-[4px] after:w-[0%] after:left-0 after:bottom-[-12px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%]";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/Media" ||
      (id && pathname === `/Media/${id}`) ||
      pathname === "/Form" ||
      pathname === "/Couch" ||
      pathname === "/what" ||
      pathname === "/Events" ||
      pathname === "/Firstlego" ||
      pathname === "/About"
    ) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [pathname]);
  return display ? (
    <div
      className={`${
        isScrolled ? "bg-white sticky top-0" : "bg-transparent"
      } w-full sticky top-0 z-50  flex items-center justify-center px-2 md:px-4 py-6 lg:px-16 lg:py-6 transition-colors duration-300`}
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
        <nav className="hidden md:flex items-center justify-center space-x-8 ">
          {links.map(({ label, path }, index) => (
            <Link
              key={`${label}-${index}`}
              href={path}
              className={`${pathname === path ? activeLink : normalLink}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/Form"
          className="bg-[#FBB12F] cursor-pointer text-black hover:bg-white hover:text-[#fbb12f] transition-all ease-in-out duration-700 rounded-3xl py-2 px-3 text-[14px] hidden md:flex font-medium"
        >
          Get Involved
        </Link>

        <div className="md:hidden">
          <div className="text-2xl" onClick={() => setIsDrawerOpen(true)}>
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
  ) : null;
};

export default Navbar;
