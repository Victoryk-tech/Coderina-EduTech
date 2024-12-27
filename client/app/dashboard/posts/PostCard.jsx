import React from "react";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import { IoEllipsisHorizontal } from "react-icons/io5";

const PostCard = ({ post, formatTime, handleOpenModals, handleModalOpen }) => {
  return (
    <div className="p-7 border-b border-gray-300 mb-[5rem] hover:bg-[#f8f8f8ee]">
      <div className="flex sm:flex-row flex-col sm:justify-between gap-10">
        <div className="flex gap-4 items-center w-full sm:w-[50%]">
          <div className="p-1 bg-[#EEEE] rounded-md">
            <Image
              src={post.images[0] || "/default-image.jpg"}
              alt={post.title}
              width={70}
              height={70}
              className="object-cover rounded-md"
              onClick={() => handleOpenModals(post.images)} // Open the first image of gallery
            />
          </div>
          <div className="text-xs flex flex-col gap-2">
            <h3 className="font-bold text-sm">{post.title}</h3>
            <p>{post.author}</p>
            <div className="flex items-center gap-3">
              <p className="uppercase font-semibold">{post.category}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full sm:w-[50%] uppercase text-xs">
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              {/* {new Date(post.createdAt).toLocaleString("en-US", {
                       month: "short",
                       day: "numeric",
                     })} */}
              {formatTime(post.createdAt)}
            </p>
            <p>posted</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              {" "}
              {Array.isArray(post.likes) ? post.likes.length : 0}
            </p>
            <p>likes</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              {Array.isArray(post.comments) ? post.comments.length : 0}
            </p>
            <p>comments</p>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg hover:bg-[#dc7d7dee]">
            <MdArrowOutward />
          </div>
          <div
            className="p-3 hover:bg-[#EEEE] hover:rounded-md"
            onClick={() => handleModalOpen(post)}
          >
            <IoEllipsisHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
