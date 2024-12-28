"use client";

import React, { useEffect, useState } from "react";
import {
  MenuIcon,
  BellIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import logo from "../../../public/coderinaLogo.png";
import { RiMenu2Fill, RiHome2Fill, RiSettings2Line } from "react-icons/ri";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import { GoHome, GoPeople } from "react-icons/go";
import { BsActivity } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { deleteCookies } from "@/app/lib/logout";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [username, setUsername] = useState("");

  const [greeting, setGreeting] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await deleteCookies("token");
      toast.success("Logged out successfully!");
      router.push("/"); // Redirect to the login page or homepage
      // const response = await axios.delete("/api/auth/logout");
      // if (response.data.success) {
      //   toast.success("Logged out successfully!");
      //   router.push("/"); // Redirect to the login page or homepage
      // }
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const links = [
    { icon: <GoHome />, name: "Home", path: "/dashboard/overview" },
    { icon: <RiMenu2Fill />, name: "Posts", path: "/dashboard/posts" },
    {
      icon: <BsActivity />,
      name: "Activities",
      path: "/dashboard/activity",
    },
    {
      icon: <GoPeople />,
      name: "Subscribers",
      path: "/dashboard/subscribers",
    },
    {
      icon: <GoPeople />,
      name: "Couch",
      path: "/dashboard/couchForm",
    },
    {
      icon: <RiSettings2Line />,
      name: "Settings",
      path: "/dashboard/settings",
    },
  ];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    // Check if the user is logged in by verifying if the greeting exists in localStorage
    const storedGreeting = sessionStorage.getItem("greeting");
    if (storedGreeting) {
      setGreeting(storedGreeting); // Set the greeting if found
    } else {
      // If greeting is not found, redirect to login
      router.push("/login");
    }
  }, []);

  return (
    <div className="h-screen flex font-Inter">
      <Toaster />
      {/* Sidebar */}
      <aside
        className={`bg-gray-200 text-gray-700 w-56 p-4 flex flex-col items-start space-y-6 ${
          showSidebar ? "absolute top-0 left-0 h-screen z-50" : "hidden md:flex"
        } md:sticky md:top-0 md:h-screen`}
      >
        <Link href="/" className="flex items-center mb-6">
          <Image src={logo} alt="Coderina Logo" className=" h-8 w-32" />
        </Link>
        <ul className="space-y-4 md:pt-14">
          {links.map((link) => (
            <li
              key={link.name}
              className={`${
                pathname === link.path
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              <Link
                href={link.path}
                className="flex items-center text-lg space-x-4"
              >
                <p>{link.icon}</p>
                <p>{link.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white text-black py-6 px-6 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <h1 className="text-[15px] font-bold hidden md:block">
            {greeting ? <p>{greeting}</p> : <p>Loading...</p>}
          </h1>
          <div className="flex items-center">
            <MenuIcon
              className="h-6 w-6 mr-4 cursor-pointer block md:hidden"
              onClick={toggleSidebar}
            />
            {/* <Image src={logo} alt="Coderina Logo" className="w-40 h-10" /> */}
          </div>

          <h1 className="text-[15px] font-bold flex md:hidden">
            {greeting ? <p>{greeting}</p> : <p>Loading...</p>}
          </h1>

          <div className="flex items-center space-x-4">
            <BellIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setShowNotification(!showNotification)}
            />
            <UserCircleIcon
              className="h-8 w-8 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="absolute right-6 top-14 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Settings
                </Link>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
                  <LogoutIcon onClick={handleLogout} className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Notification Panel */}
        {showNotification && (
          <div className="absolute top-16 right-6 w-64 bg-white shadow-lg rounded-lg py-2 px-4 z-50">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <ul>
              <li className="py-1">Notification 1</li>
              <li className="py-1">Notification 2</li>
              <li className="py-1">Notification 3</li>
            </ul>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-2">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
