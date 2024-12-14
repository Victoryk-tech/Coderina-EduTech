import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import newsImg1 from "../../public/newsImg1.png";
import newsImg2 from "../../public/newsImg2.png";
import newsImg3 from "../../public/newsImg3.png";
import newsImg4 from "../../public/newsImg4.png";
import Image from "next/image";

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

  return (
    <div className="w-full px-2 md:px-4 lg:px-16 py-10 font-Geist">
      <div>
        <div className="w-full flex items-center justify-between">
          <h5 className="font-semibold text-[20px] md:text-[32px] text-center md:text-start">
            News & Updates
          </h5>
          <button className="hidden md:flex space-x-2 rounded-3xl p-3 bg-[#FBB12F] text-black text-[16px]">
            <p> View all</p> <HiOutlineArrowNarrowRight size={18} />
          </button>
        </div>

        <div className="w-full grid md:grid-cols-4 items-start justify-between gap-y-6 md:gap-y-0 mt-10">
          {newsCard.map((cardInfo, i) => {
            return (
              <div
                key={i}
                className="space-y-2 w-full md:w-[270px] h-full md:h-[330px]"
              >
                <div className="w-full md:w-[260px] h-[200px]">
                  <Image
                    src={cardInfo.img}
                    alt={`Image for news: ${cardInfo.text}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[14px]">{cardInfo.date}</p>
                  <h3 className="font-normal text-[15px] md:text-[16px] leading-6">
                    {cardInfo.text}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
