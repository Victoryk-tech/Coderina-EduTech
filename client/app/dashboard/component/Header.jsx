"use client";
import React, { useState, useEffect } from "react";

import {
  MenuIcon,
  BellIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../public/coderinaLogo.png";
import { RiMenu2Fill, RiHome2Fill, RiSettings2Line } from "react-icons/ri";
import Image from "next/image";

const Header = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  //   useEffect(() => {
  //     const handleStart = () => setLoading(true);
  //     const handleComplete = () => setLoading(false);

  //     router.events.on("routeChangeStart", handleStart);
  //     router.events.on("routeChangeComplete", handleComplete);
  //     router.events.on("routeChangeError", handleComplete);

  //     return () => {
  //       router.events.off("routeChangeStart", handleStart);
  //       router.events.off("routeChangeComplete", handleComplete);
  //       router.events.off("routeChangeError", handleComplete);
  //     };
  //   }, [router.events]);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="h-screen ">
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          {/* Add your loader component here */}
          <div className="loader">Loading...</div>
        </div>
      )}
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center sticky top-0 bottom-0 shadow-md z-50">
        <div className="flex items-center">
          {/* Hamburger menu icon (visible on mobile) */}
          <MenuIcon
            className="h-6 w-6 mr-4 cursor-pointer block md:hidden"
            onClick={toggleSidebar}
          />
          <Image src={logo} alt="Coderina Logo" className="w-40 h-10" />
        </div>
        <div className="flex items-center">
          <BellIcon
            className="h-6 w-6 mr-4 cursor-pointer"
            onClick={() => setShowNotification(!showNotification)}
          />
          <div className="relative">
            <UserCircleIcon
              className="h-8 w-8 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
                >
                  <LogoutIcon className="h-5 w-5 mr-2" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
