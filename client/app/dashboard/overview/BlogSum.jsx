import { IoEllipsisHorizontal } from "react-icons/io5";
import { LoadingSkeleton } from "../../shared/Spinner";
import React, { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";

const BlogSum = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstFourBlogs, setFirstFourBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/allBlogs`);
        const data = await response.json();

        if (response.ok) {
          setBlogs(data.data);
          setFirstFourBlogs(data.data.slice(0, 4));
          setTotalBlogs(data.totalBlogs);
        } else {
          console.error("Failed to fetch blogs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;

    // If it's more than a month old, show the full date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return postDate.toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="mt-7">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      {/* <p>Total Blogs: {totalBlogs}</p> */}
      <div className="flex flex-col gap-y-4">
        {firstFourBlogs.map((blog, index) => (
          <div
            className="md:p-7 border-b border-gray-300 hover:text-white hover:bg-[rgba(72,70,70,0.93)]"
            key={index}
          >
            <div className="flex sm:flex-row flex-col sm:justify-between gap-10">
              <div className="flex gap-4 items-center w-full ">
                <div className="p-1 bg-[#EEEE] rounded-md">
                  <Image
                    src={blog.images[0] || "/default-image.jpg"}
                    alt={blog.title}
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="text-xs flex flex-col gap-2">
                  <h3 className="font-bold text-sm">{blog.title}</h3>
                  <p>coderina</p>
                  <div className="flex items-center gap-3">
                    <p className="uppercase font-semibold">{blog.category}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full  uppercase text-xs">
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{formatTime(blog.createdAt)}</p>
                  <p>posted</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">
                    {" "}
                    {Array.isArray(blog.likes) ? blog.likes.length : 0}
                  </p>
                  <p>likes</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">
                    {Array.isArray(blog.comments) ? blog.comments.length : 0}
                  </p>
                  <p>comments</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg hover:bg-[#dc7d7dee]">
                  <MdArrowOutward />
                </div>
                <div className="p-3 hover:bg-[#EEEE] hover:rounded-md">
                  <IoEllipsisHorizontal />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSum;
