import React, { useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import TelegramIcon from "@mui/icons-material/Telegram";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Modal = ({ isOpen, onClose, position }) => {
  const modalRef = useRef();

  // Handle click outside of the modal to close it
  useEffect(() => {
    if (!isOpen) return; // Only add the event listener if the modal is open

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close modal when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        ref={modalRef}
        className="bg-white mr-20 rounded-lg shadow-lg p-4 w-64 flex justify-start"
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          X
        </button>
        <ul>
          <li
            className="hover:bg-gray-100 p-2 cursor-pointer text-gray-500"
            onClick={() => alert("Send Message")}
          >
            <TelegramIcon className="mr-2" />
            Send Message
          </li>
          <li
            className="hover:bg-gray-100 p-2 cursor-pointer text-gray-500"
            onClick={() => alert("Edit Subscription")}
          >
            <EditIcon className="mr-2" />
            Edit Subscription
          </li>
          <li
            className="hover:bg-gray-100 p-2 cursor-pointer text-red-500"
            onClick={() => alert("Delete")}
          >
            <DeleteOutlineIcon className="mr-2" />
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
