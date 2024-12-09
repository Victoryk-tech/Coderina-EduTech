// pages/writer/[writer]/dashboard
"use client";
import { useRouter } from "next/navigation";

import { MdArrowOutward } from "react-icons/md";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { LuImage } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GoDash } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiShareFat } from "react-icons/pi";
import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";
import { SlEarphones } from "react-icons/sl";
import { IoVideocamOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { LuMessageCircle } from "react-icons/lu";
import DropdownButton from "../component/DropdownButton";

const Overview = ({ writer }) => {
  const dropdownItems = [
    { label: "Post", href: "#", icon: RiMenu2Fill },
    { label: "Audio", href: "#", icon: SlEarphones },
    { label: "Video", href: "#", icon: IoVideocamOutline },
    { label: "Thread", href: "#", icon: FiMessageSquare },
    { label: "New note", href: "#", icon: SlNote },
  ];

  return (
    <div className="mx-[2.7rem]  bg-white mt-8  text-gray-700 ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-700">Home</h1>
        <div className="flex gap-3">
          {" "}
          <Link
            href="/"
            className=" py-2 px-3 rounded-md hover:bg-[#ccce] bg-[#EEE]"
          >
            View site
          </Link>
          <div className="relative inline-block text-left">
            <DropdownButton buttonText="New post" items={dropdownItems} />
          </div>
        </div>
      </div>
      <h1 className="mt-8 text-lg font-semibold">Overview</h1>
      <div className="flex justify-between flex-wrap items-center mt-4 gap-4 ">
        <div className="border cursor-pointer border-gray-200 p-4 rounded-lg w-[420px] hover:bg-gray-100 ">
          <div className="flex justify-between mb-4">
            <p> All subscribers</p>
            <AiOutlineExclamationCircle />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-[800] text-3xl">1</p>
            <div className="flex items-center gap-1 text-xs bg-gray-100 rounded-lg  px-2 py-1 border border-gray-300">
              <GoDash />

              <p>0 in the last 30days</p>
            </div>
          </div>
        </div>
        <div className="border cursor-pointer border-gray-200 p-4 rounded-lg w-[420px] hover:bg-gray-100 ">
          <div className="flex justify-between mb-4">
            <p> subscribers from app</p>
            <AiOutlineExclamationCircle />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-[800] text-3xl">0</p>
            <div className="flex items-center gap-1 text-xs bg-gray-100 rounded-lg  px-2 py-1 border border-gray-300">
              <GoDash />

              <p>0 in the last 30days</p>
            </div>
          </div>
        </div>
        <div className="border cursor-pointer border-gray-200 p-4 rounded-lg w-[420px] hover:bg-gray-100 ">
          <div className="flex justify-between mb-4">
            <p>30 day views</p>
            <AiOutlineExclamationCircle />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-[800] text-3xl">3</p>
            <div className="flex items-center gap-1 text-xs bg-gray-100 rounded-lg  px-2 py-1 border border-gray-300">
              <GoDash />

              <p>0 in the last 30days</p>
            </div>
          </div>
        </div>
        <div className="border cursor-pointer border-gray-200 p-4 rounded-lg w-[420px] hover:bg-gray-100 ">
          <div className="flex justify-between mb-4">
            <p>30 day open rate</p>
            <AiOutlineExclamationCircle />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-[800] text-3xl">-</p>
            <div className="flex items-center gap-1 text-xs bg-gray-100 rounded-lg  px-2 py-1 border border-gray-300">
              <GoDash />

              <p>0 in the last 30days</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col justify-between mt-10 gap-10 ">
        <div className=" sm:w-[58%] w-full">
          <div className="flex justify-between gap-12">
            <p className="text-xl font-semibold">Latest post</p>
            <p className="text-sm">View post stats</p>
          </div>
          <div className="border border-gray-200 p-10 rounded-lg mt-6">
            <div className="flex  justify-between cursor-pointer  items-center  bg-[#fafafa] rounded-lg p-4 border-b mb-12 border-gray-200">
              <div className="flex  gap-4 ">
                <div className="p-4 bg-[#EEEE] rounded-md ">
                  <LuImage size={26} color="#707070ee" />
                </div>
                <div className="text-xs ">
                  <h3 className="font-bold text-sm">coming soon</h3>
                  <p>By Michael Harry</p>
                  <p>Mar 31</p>
                </div>
              </div>
              <div className="p-3 hover:bg-[#EEEE] hover:rounded-md">
                <IoEllipsisHorizontal />
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-200  py-8 font-semibold">
              <p> views</p>
              <p>0</p>
            </div>
            <div className="flex justify-between border-t border-gray-200  py-8 font-semibold">
              <p> Opened</p>
              <p>-</p>
            </div>
            <div className="flex justify-between border-t border-gray-200  py-8 font-semibold">
              <p> New subs</p>
              <p>-</p>
            </div>
            <div className="flex justify-between border-t border-gray-200  py-8 font-semibold">
              <p> Likes</p>
              <p>0</p>
            </div>
            <div className="flex justify-between border-t border-gray-200  py-8 font-semibold">
              <p> comments</p>
              <p>0</p>
            </div>
            <button className="rounded-md w-full py-2 bg-[#ff9900] hover:bg-[#f48d2d] text-white gap-2 flex items-center justify-center">
              <PiShareFat color="white" size={25} />
              Share Post
            </button>
          </div>
        </div>
        <div className="w-full sm:w-[37%]">
          <div className="flex justify-between ">
            {" "}
            <p className="text-xl font-semibold">Drafts</p>
            <div className="text-sm flex gap-1 items-center cursor-pointer">
              <p> View all</p>
              <IoIosArrowRoundForward color="#707070ee " size={20} />
            </div>
          </div>
          <div className="flex justify-between items-center text-sm cursor-pointer hover:bg-[#fafafa] border border-gray-200 rounded-xl py-3 px-4 mt-6">
            <div className="flex flex-col gap-1  ">
              <p className="font-semibold">How to use the coderina editor</p>
              <p className="text-xs ">By Michael Harry</p>
              <p className="uppercase text-xs ">last updated mar 31</p>
            </div>
            <div className="p-3 hover:bg-[#EEEE] hover:rounded-md">
              <IoEllipsisHorizontal />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 h-screen">
        <div className="flex justify-between">
          {" "}
          <h1 className="text-xl font-semibold">Recent posts</h1>{" "}
          <div className="text-sm flex gap-1 items-center cursor-pointer">
            <p> View all</p>
            <IoIosArrowRoundForward color="#707070ee " size={20} />
          </div>
        </div>
        <div className=" border border-gray-200 p-7 mt-5 rounded-xl mb-[5rem]">
          <div className="flex sm:flex-row flex-col sm:justify-between gap-10  hover:bg-[#fafafa] py-5">
            <div className="flex  gap-4 w-full items-center  sm:w-[50%]">
              <div className="p-4 bg-[#EEEE] rounded-md ">
                <LuImage size={26} color="#707070ee" />
              </div>
              <div className="text-xs flex flex-col gap-2 ">
                <h3 className="font-bold text-sm">coming soon</h3>
                <p>By Michael Harry</p>
                <div className="flex items-center gap-2">
                  <p>Mar 31</p>
                  <CiHeart size={18} />
                  <span className="font-semibold">0</span>
                  <LuMessageCircle size={15} />
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between  items-center  w-full sm:w-[50%] uppercase text-xs ">
              <div className="flex flex-col gap-2">
                <p className="font-bold">0%</p>
                <p>Opened</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">0</p>
                <p>views</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">0</p>
                <p>new subs</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-[#EEEE]">
                <MdArrowOutward />
              </div>
              <div className="p-3 hover:bg-[#EEEE] hover:rounded-md">
                <IoEllipsisHorizontal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { writer } = params;

//   // Fetch data specific to the writer using 'writer' parameter
//   // For example:
//   // const writerData = await fetchWriterData(writer);

//   return {
//     props: {
//       writer,
//       // Pass any additional data fetched from the server as props
//     },
//   };
// }

export default Overview;
