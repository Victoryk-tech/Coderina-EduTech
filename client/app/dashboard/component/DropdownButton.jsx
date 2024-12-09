import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { SlEarphones, SlNote } from "react-icons/sl";
import { IoVideocamOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";

const DropdownButton = ({ buttonText }) => {
  const items = [
    { label: "Post", href: "./createPost", icon: RiMenu2Fill },
    { label: "Audio", href: "#", icon: SlEarphones },
    { label: "Video", href: "#", icon: IoVideocamOutline },
    { label: "Thread", href: "#", icon: FiMessageSquare },
    { label: "New note", href: "#", icon: SlNote },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-[#eccc5a] py-2 px-3 gap-1 rounded-md text-white hover:bg-[#f48d2d] flex items-center"
      >
        {buttonText}
        <MdKeyboardArrowDown color="white" size={23} className="mt-1" />
      </button>

      {isOpen && (
        <div className="absolute z-50 right-[-4rem] mt-2 w-[15.6rem] p-3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item, index) => {
              const isSecondToLast = index === items.length - 2;
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-lg gap-2 text-gray-800 hover:rounded-lg hover:bg-gray-100 ${
                    isSecondToLast ? "border-b border-gray-300" : ""
                  }`}
                  role="menuitem"
                >
                  {item.icon && <item.icon className="mr-2" />}
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
