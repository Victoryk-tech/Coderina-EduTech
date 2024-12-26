import React from "react";
import education from "../../../public/Education.png";
import equality from "../../../public/equality.png";
import growth from "../../../public/growth.png";
import innovation from "../../../public/innovation.png";
import Image from "next/image";

const Alignment = () => {
  const align = [
    {
      img: education,
      desc: "Promoting inclusive and equitable quality education.",
    },
    {
      img: equality,
      desc: "Empowering girls through the Her e-STEM initiative.",
    },
    {
      img: growth,
      desc: "Encouraging entrepreneurship and innovation through COUCH.",
    },
    {
      img: innovation,
      desc: "Building resilient infrastructure and fostering innovation through STEAM programs.",
    },
  ];
  return (
    <div className="space-y-10 py-10 md:py-14">
      <div>
        <h1 className="font-bold text-[32px] leading-[41.1px]">
          Alignment with the SDGs
        </h1>
      </div>
      <div className="w-full grid md:grid-cols-4 items-start justify-between space-y-5 md:space-y-0  md:space-x-3 ">
        {align.map((sec, index) => {
          return (
            <div key={index} className="space-y-3">
              <div className="w-full  md:w-[290px] h-[270px]">
                <Image
                  src={sec.img}
                  alt="innovate"
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-center font-normal text-[16px] leading-7">
                {sec.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alignment;
