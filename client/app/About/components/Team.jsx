import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import memberImg from "../../../public/member-img.png";

import Image from "next/image";
import SolutionCards from "../../Home/SolutionCards";
import CustomButton from "@/app/Home/CustomButton";
const Team = () => {
  const ourTeamCard = [
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
    {
      img: memberImg,
      text: "Firstname Lastname",
    },
  ];
  return (
    <div className="px-4 md:px-4 lg:px-16 py-12 bg-white">
      {" "}
      <div className="team__container">
        <div className="flex items-center justify-between">
          <h4 className="text-[20px] md:text-[30px]">Our Team</h4>
          <CustomButton>
            Volunteer with us <FaArrowRightLong />
          </CustomButton>
        </div>
        <div className="grid md:grid-cols-4 items-center justify-center gap-x-3">
          {ourTeamCard.map((teamCard, i) => {
            return (
              <div key={i} className=" W-[260px] h-[390px]">
                <SolutionCards {...teamCard} childern2="Role" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;
