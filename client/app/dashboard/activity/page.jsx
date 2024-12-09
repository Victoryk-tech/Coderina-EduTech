"use client";

import { useState } from "react";

import Image from "next/image";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BlogBanner1 from "../../../public/blog-banner.jpg";
import DateConvert from "../component/DateConvert";

const Activity = () => {
  const activity = [
    {
      id: 1,
      type: "Replies & mentions",
      userImg: BlogBanner1,
      date: "2023-09-15",
      title: "You made a new post",
      content: "You have 5 new replies and 3 new mentions",
      action: "Open Draft",
    },
    {
      id: 2,
      type: "Replies & mentions",
      userImg: BlogBanner1,
      date: "2024-09-15",
      time: "12:00",
      title: "Substact recent happening",
      content: "Your post has been restacked 10 times",
    },
    {
      id: 3,
      type: "Replies & mentions",
      userImg: BlogBanner1,
      date: "2024-05-15",
      time: "12:00",
      title: "You were mentioned in Jane Doe's post",
      content: "You have 5 new replies and 3 new mentions",
    },
  ];

  const [filter, setFilter] = useState("All");

  // Function to filter activities based on the selected filter
  const filteredActivity =
    filter === "All" ? activity : activity.filter((act) => act.type === filter);

  return (
    <div className="min-h-screen text-gray-200 p-4 my-12">
      <div className="max-w-2xl mx-auto">
        <div className="-4 rounded-full bg-gray-200 gap-8 inline-flex justify-center p-2 sticky top-0 z-10">
          <button
            className={`textlg px-3 shadow-full  ${
              filter === "All" && "bg-white text-gray-900 rounded-full"
            } focus:bg-white focus:text-gray-900 focus:rounded-full text-gray-500`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`text-lg px-3 ${
              filter === "Replies & mentions" &&
              "bg-white text-gray-900 rounded-full"
            } focus:bg-white focus:rounded-full focus:text-gray-900 text-gray-500`}
            onClick={() => setFilter("Replies & mentions")}
          >
            Replies & mentions
          </button>
          <button
            className={`text-lg px-3 ${
              filter === "Restacks" && "bg-white text-gray-900 rounded-full"
            } focus:bg-white focus:rounded-full focus:text-gray-900 text-gray-500`}
            onClick={() => setFilter("Restacks")}
          >
            Restacks
          </button>
        </div>

        <div className="space-y-6 mt-12">
          {filteredActivity.length > 0 ? (
            filteredActivity.map((act) => (
              <div
                key={act.id}
                className="mt-6 p-2 flex flex-col items-start space-x-4 hover:bg-gray-100 hover:cursor-pointer"
              >
                <div className="flex flex-row space-x-2">
                  <div className="flex-shrink-0">
                    <BookmarkIcon style={{ color: "orange" }} />
                  </div>
                  <Image
                    src={act.userImg}
                    alt="user"
                    className=" flex-shrink-0 rounded-full w-8 h-8 object-cover"
                  />
                </div>
                <div className="px-5">
                  <p className="text-lg text-gray-900">
                    {act.title}
                    <span className="ml-8 text-gray-500">
                      <DateConvert date={act.date} />
                    </span>
                  </p>
                  <p className="text-lg text-gray-500">{act.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-44 text-gray-500 font-bold text-xl">
              <p>No activity</p>
            </div>
          )}
        </div>
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

export default Activity;
