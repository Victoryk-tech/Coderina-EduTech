import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import newsImg1 from "../../public/newsImg1.png";
import newsImg2 from "../../public/newsImg2.png";
import newsImg3 from "../../public/newsImg3.png";
import newsImg4 from "../../public/newsImg4.png";
import Image from "next/image";
import Link from "next/link";
import { LoadingSkeleton } from "../shared/Spinner";

const News = () => {
  const newsCard = [
    {
      img: newsImg1,
      text: "Africa Code Week: Empowering Educators and Youth for a Digital Future",
      date: "Sept. 2023",
    },
    {
      img: newsImg2,
      text: "Nigeria Embraces the Future: Robotics and AI in Basic Education",
      date: "Oct. 2023",
    },
    {
      img: newsImg3,
      text: "Introducing the First Lego League Challenge Masterpiece",
      date: "Nov. 2023",
    },
    {
      img: newsImg4,
      text: "Educating the Educators: Coderina's FIRST LEGO League (FLL) Explore and Discover Workshop in Nigeria",
      date: "Dec. 2023",
    },
  ];

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
      <div className="my-7">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-4 lg:px-16 py-10 font-Geist">
      <div>
        <div className="w-full flex items-center justify-between">
          <h5 className="font-semibold text-[20px] md:text-[32px] text-center md:text-start">
            News & Updates
          </h5>
          <Link
            href="/Media"
            className="hidden md:flex space-x-2 rounded-3xl p-3 bg-[#FBB12F] hover:text-[#fbb12f] hover:bg-white text-black text-[16px] text-center"
          >
            <p> View all</p> <HiOutlineArrowNarrowRight size={20} />
          </Link>
        </div>

        <div className="w-full grid md:grid-cols-4 items-start justify-between gap-y-6 md:gap-y-0 mt-10">
          {firstFourBlogs.map((blog, index) => (
            <div
              key={index}
              className="space-y-2 w-full md:w-[270px] h-full md:h-[330px]"
            >
              <div className="w-full">
                <Image
                  src={blog.images[0] || "/default-image.jpg"}
                  alt={blog.title}
                  width={360}
                  height={360}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-2">
                <p className="text-[14px]">{formatTime(blog.createdAt)}</p>
                <h3 className="font-normal text-[15px] md:text-[16px] leading-6">
                  {blog.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

// import React from "react";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// import newsImg1 from "../../public/newsImg1.png";
// import newsImg2 from "../../public/newsImg2.png";
// import newsImg3 from "../../public/newsImg3.png";
// import newsImg4 from "../../public/newsImg4.png";
// import Image from "next/image";
// import Link from "next/link";
// import LikeAndComment from "../Media/component/Likes";

// const LoadingSpinner = () => {
//   return (
//     <div className="flex justify-center items-center h-48">
//       <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
//     </div>
//   );
// };

// const News = ({
//   blogs = [],
//   formatTime,
//   handleLike,
//   likesAndComments,
//   loading,
// }) => {
//   return (
//     <div className="w-full px-2 md:px-4 lg:px-16 py-10 font-Geist">
//       <div>
//         <div className="w-full flex items-center justify-between">
//           <h5 className="font-semibold text-[20px] md:text-[32px] text-center md:text-start">
//             News & Updates
//           </h5>
//           <button className="hidden md:flex space-x-2 rounded-3xl p-3 bg-[#FBB12F] text-black text-[16px]">
//             <p> View all</p> <HiOutlineArrowNarrowRight size={18} />
//           </button>
//         </div>

//         {loading ? (
//           <LoadingSpinner />
//         ) : (
//           <div className="w-full grid md:grid-cols-4 items-start justify-between gap-y-6 md:gap-y-0 mt-10">
//             {blogs.slice(0, 4).map((blog) => {
//               const { likesCount, commentsCount, liked } =
//                 likesAndComments?.[blog._id] || {};
//               return (
//                 <div
//                   key={blog._id}
//                   className="space-y-2 w-full md:w-[270px] h-full md:h-[330px]"
//                 >
//                   {blog.images?.length > 0 && (
//                     <div className="w-full">
//                       <Image
//                         src={blog.images[0]}
//                         alt={blog.title}
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                   )}
//                   <div className="space-y-2">
//                     <p className="text-[14px]"> {formatTime(blog.createdAt)}</p>
//                     <h3 className="font-normal text-[15px] md:text-[16px] leading-6">
//                       {blog.title}
//                     </h3>
//                     <LikeAndComment
//                       likes={likesCount}
//                       comments={commentsCount}
//                       liked={liked}
//                       toggleLike={() => handleLike(blog._id)}
//                     />
//                   </div>

//                   <Link href={`/Media/${blog._id}`}>
//                     <p className="text-blue-500 hover:underline text-sm mt-2">
//                       Read More
//                     </p>
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default News;
