"use client";
import { useRouter } from "next/navigation";

import { MdArrowOutward, MdKeyboardArrowDown } from "react-icons/md";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { LuImage, LuMessageCircle } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { MdCheck } from "react-icons/md";
import { BsToggles2 } from "react-icons/bs";

import DropdownButton from "../component/DropdownButton";
import Pagination from "../component/PostPagnation";

const Posts = ({ writer }) => {
  const [activeNav, setActiveNav] = useState("Published");

  const navItems = [
    { category: "Published", total: "1" },
    { category: "Drafts", total: "0" },
    { category: "Scheduled", total: "3" },
  ];

  const items = [
    { label: "Newest", href: "#" },
    { label: "Oldest", href: "#" },
    { label: "Recently edited", href: "#" },
    { label: "Relevance", href: "#" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="mx-[5.7rem] bg-white mt-8 text-gray-700">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Posts for {writer}</h1>
        {/* Dropdown1 */}
        <div className="relative inline-block text-left">
          <DropdownButton buttonText="New post" />
        </div>
      </div>
      <div className="flex justify-between border-b border-gray-300 mt-[5rem] pb-5 items-center">
        {/* nav */}
        <div className="flex justify-between gap-7 items-center">
          <nav className="flex gap-6 mt-5 ">
            {navItems.map((item) => (
              <div
                key={item.category}
                className={`relative pb-2 flex gap-2 text-sm  ${
                  activeNav === item.category
                    ? "text-gray-900 font-semibold   after:absolute after:left-0 after:bottom-0 after:top-[2.9rem]  after:h-[2.7px] after:w-full after:bg-gray-600 after:rounded-full"
                    : "text-gray-600  "
                }`}
              >
                <a href="#" onClick={() => setActiveNav(item.category)}>
                  {item.category}
                </a>
                <div
                  className={`w-5 h-5 text-[13px] font-semibold  text-center rounded-full ${
                    item.category === "Drafts"
                      ? "bg-gray-300 text-gray-600"
                      : "bg-[#363737] text-white"
                  }`}
                >
                  {item.total}
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex justify-between gap-5 items-center">
          <input
            type="search"
            placeholder="Search"
            className="bg-[#EEEE] rounded-md border-none outline-none focus:outline-none focus:ring-0 focus:shadow-[0_0_0_1px_#ff9900]"
          />
          <div className="flex gap-2 items-center hover:bg-[#EEEE] py-2 px-3 rounded-md">
            <BsToggles2 color="gray" />
            <p className="">Filter</p>
          </div>
          {/* dropdown2 */}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="py-2 px-3 gap-1 hover:bg-[#EEEE] rounded-md flex items-center"
            >
              {selectedItem.label}
              <MdKeyboardArrowDown color="gray" size={18} className="mt-1" />
            </button>

            {isOpen && (
              <div className="absolute right-[-4rem] mt-2 w-[15.6rem] p-3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {items.map((item, index) => {
                    const isSecondToLast = index === items.length - 1;
                    return (
                      <a
                        key={index}
                        href={item.href}
                        onClick={() => handleItemClick(item)}
                        className={`flex items-center px-4 py-2 font-semibold text-[0.95rem] gap-2 hover:rounded-lg hover:bg-gray-100 ${
                          isSecondToLast ? "text-gray-400" : "text-gray-800"
                        }`}
                        role="menuitem"
                      >
                        {item.label}
                        {item.label === selectedItem.label && (
                          <MdCheck className="ml-auto text-green-500" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm">March 2024</p>
      <div className="p-7 border-b border-gray-300 mb-[5rem] hover:bg-[#f8f8f8ee]">
        <div className="flex sm:flex-row flex-col sm:justify-between gap-10">
          <div className="flex gap-4 items-center w-full sm:w-[50%]">
            <div className="p-4 bg-[#EEEE] rounded-md">
              <LuImage size={26} color="#707070ee" />
            </div>
            <div className="text-xs flex flex-col gap-2">
              <h3 className="font-bold text-sm">coming soon</h3>
              <p>By Michael Harry</p>
              <div className="flex items-center gap-3">
                <p className="uppercase font-semibold">Mar 31</p>
                <CiHeart size={18} />
                <span className="font-semibold">0</span>
                <LuMessageCircle size={15} />
                <span className="font-semibold">0</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full sm:w-[50%] uppercase text-xs">
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
      <div className="flex justify-end mt-5">
        <Pagination currentPage={1} totalPages={1} />
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { writer } = context.query;
//   return {
//     props: { writer },
//   };
// }

export default Posts;
