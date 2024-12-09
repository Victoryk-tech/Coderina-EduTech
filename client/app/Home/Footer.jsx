import React from "react";
import { RiMapPin3Fill } from "react-icons/ri";
import { TbClockHour3Filled } from "react-icons/tb";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMailFill } from "react-icons/ri";
import Logo from "../../public/coderinaBgLogo.png";
import {
  blueColor,
  darkGreenColor,
  redColor,
  yellowColor,
} from "../utils/constants";
import Image from "next/image";
const Footer = () => {
  const footerInfo = [
    {
      title: "Address",
      content: [
        <>
          <RiMapPin3Fill color={redColor} /> 4 Ngozi Okonjo Iweala way, Utako
          district
        </>,
        <>
          <RiMapPin3Fill color={redColor} /> 4 Oye Balogun St, Lekki Penninsula
          II, Lekki Lagos
        </>,
        <>
          <TbClockHour3Filled color={yellowColor} /> Mon - Fri 9.00 - 5.00
        </>,
      ],
    },
    {
      title: "Email & Phone Number",
      content: [
        <>
          <FaPhoneAlt color={darkGreenColor} /> +234 9093307353 (Call and
          WhatsApp)
        </>,
        <>
          <RiMailFill color={blueColor} /> Planning@coderina.org
        </>,
      ],
    },
  ];

  const footerRights = [
    "Privacy Policy",
    "Accessibility Statement",
    "Information",
    "Contact Us",
  ];
  return (
    <div className="bg-[#1a1a1a] text-white  md:pt-24 ">
      <div className=" flex items-center justify-between  px-2 md:px-6 lg:px-16">
        <div className="space-y-16">
          <Image
            src={Logo}
            alt=""
            className="object-cover w-[180px] h-10"
            priority
          />
          <div className="flex items-center justify-center space-x-4">
            <FaFacebookF size={24} />
            <AiFillInstagram size={24} />
            <FaYoutube size={24} />
            <FaXTwitter size={24} />
          </div>
        </div>
        <div className="space-y-3">
          <h3>Address</h3>
          <div className="flex space-x-2">
            <RiMapPin3Fill color={redColor} />
            <p>4 Ngozi Okonjo Iweala way, Utako district</p>
          </div>
          <div className="flex space-x-2">
            <RiMapPin3Fill color={redColor} />
            <p> 4 Oye Balogun St, Lekki Penninsula II, Lekki Lagos</p>
          </div>
          <div className="flex space-x-2">
            <TbClockHour3Filled color={yellowColor} />
            <p> Mon - Fri 9.00 - 5.00</p>
          </div>
        </div>
        <div className="space-y-3">
          <h3>Email & Phone Number</h3>
          <div className="flex space-x-2">
            <FaPhoneAlt color={darkGreenColor} />
            <p> +234 9093307353 (Call and WhatsApp)</p>
          </div>
          <div className="flex space-x-2">
            <RiMailFill color={blueColor} />
            <p> Planning@coderina.org</p>
          </div>
        </div>
      </div>
      <div className="border-[1px] border-t-white mt-8 md:mt-10"></div>
      <div className="text-[14px] w-full flex  items-center justify-between px-2 md:px-6 lg:px-16 py-8">
        <p>Coderina-Copyright 2024</p>
        <div className="flex  space-x-4">
          <p> Privacy Policy</p>
          <p>Accessibility Statement</p>
          <p>Information</p>
          <p>Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
