import React from "react";
import Plant from "../../../public/plant.png";
import Load from "../../../public/loading.png";
import Repeat from "../../../public/repeat.png";
import Safe from "../../../public/safe.png";
import Locate from "../../../public/loacation.png";
import Smile from "../../../public/smile.png";
import Bulb from "../../../public/bulb.png";
import Tool from "../../../public/tool.png";

import Image from "next/image";
import Scope from "./Scope";
import { gradient2 } from "@/app/utils/constants";
const AboutMV = () => {
  const mCard = [
    {
      item: "Our Mission",
      color: "#7A4F03",
      details: [
        {
          icon: Plant,
          span: "Give back and leave a lasting footprint ",
          text: "in every community we serve, creating a ripple effect of positive change.",
        },
        {
          icon: Load,
          span: "Challenge the limits of what is possible, ",
          text: "constantly pushing boundaries to achieve better educational outcomes. ",
        },
        {
          icon: Repeat,
          span: "Create and nurture a self-sustaining ecosystem ",
          text: "where students, educators, and professionals can thrive independently.",
        },
        {
          icon: Safe,
          span: "Reduce hunger and poverty ",
          text: "through education and entrepreneurial skills, building resilient communities.",
        },
      ],
    },
  ];

  const vCard = [
    {
      item: "Our Vision",
      details: [
        {
          icon: Locate,
          span: "Influence positive changes within the education sector, ",
          text: "shaping future generations through innovative learning solutions.",
        },
        {
          icon: Smile,
          span: "Bring fun into learning, ",
          text: "making education engaging and interactive for students of all ages.",
        },
        {
          icon: Bulb,
          span: "Empower teachers with 21st-century learning pedagogy, ",
          text: "equipping them with the tools they need to deliver impactful lessons.",
        },
        {
          icon: Tool,
          span: "Empower adults with the right learning and entrepreneurship tools, ",
          text: "ensuring lifelong learning and business opportunities for all.",
        },
      ],
    },
  ];
  return (
    <div
      className="py-10 px-2 md:px-4 lg:px-16 font-Geist bg-white "
      // style={{ backgroundColor: gradient2 }}
    >
      <div>
        {mCard.map((m, ind) => {
          return (
            <div key={ind}>
              <h4 className="font-bold text-[30px] leading-10 py-5">
                {m.item}
              </h4>

              <div className="grid md:grid-cols-4 items-center justify-between space-y-4 md:space-y-0">
                {m.details.map((detail, index) => {
                  return (
                    <div
                      className="bg-[#fff5e5] p-4 rounded-2xl lg:w-[265px] h-[200px] md:h-[246px] space-y-4"
                      key={index}
                    >
                      <div className="">
                        <Image
                          src={detail.icon}
                          alt=""
                          className="w-[32px] h-[32px] bg-[#FAD9A0] rounded-full p-2"
                        />
                      </div>
                      <div
                        color={m.color}
                        className="text-sm text-[16px] lg:text-[16px] font-medium leading-[26px]"
                      >
                        <span>{detail.span}</span>
                        {detail.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {vCard.map((v, i) => {
          return (
            <div className="mt-8" key={i}>
              <h4 className="font-bold text-[30px] leading-10 py-5">
                {v.item}
              </h4>

              <div className="grid md:grid-cols-4 items-center justify-between space-y-4 md:space-y-0">
                {v.details.map((detail, indo) => {
                  return (
                    <div
                      className="bg-[#fff5e5] p-4 rounded-2xl lg:w-[265px] h-[220px] md:h-[250px] space-y-4"
                      key={indo}
                    >
                      <div className="">
                        <Image
                          src={detail.icon}
                          alt=""
                          className="w-[32px] h-[32px] bg-[#FAD9A0] rounded-full p-2"
                        />
                      </div>
                      <div
                        color={v.color}
                        className="text-sm text-[16px] lg:text-[16px] font-medium leading-[26px]"
                      >
                        <span>{detail.span}</span>
                        {detail.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Scope />
    </div>
  );
};

export default AboutMV;
