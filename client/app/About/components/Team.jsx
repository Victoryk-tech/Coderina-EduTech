import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import founder1 from "../../../public/founder1.jpg";
import founder2 from "../../../public/founder2.jpg";
import founder3 from "../../../public/founder3.jpg";

import Image from "next/image";
import SolutionCards from "../../Home/SolutionCards";
import CustomButton from "@/app/Home/CustomButton";
const Team = () => {
  const ourTeamCard = [
    // {
    //   img: founder1,
    //   name: "Mr Olajide Ajayi",
    //   text: "Founder",
    // },
    {
      img: founder3,
      name: "Mr Femi Niyi",
      text: "Chairman Board of trustee",
    },
    {
      img: founder2,
      name: "Mr Olabisi Kelvin Ajayi",
      text: "Director of programs and engagements",
    },
  ];
  return (
    <div className="px-4 md:px-4 lg:px-20 py-12 bg-white w-full">
      {" "}
      <div className="team__container">
        <div className="flex items-center justify-between">
          <h4 className="text-[20px] md:text-[30px]">Our Team</h4>
          <CustomButton>
            Volunteer with us <FaArrowRightLong />
          </CustomButton>
        </div>
        {/* <div className="w-full grid md:grid-cols-3 items-center justify-between space-y-10 md:space-y-0 md:gap-x-3">
          {ourTeamCard.map((teamCard, i) => {
            return (
              <div
                className="w-full md:w-[300px] md:h-[300px]  md:space-y-3 rounded-2xl"
                key={i}
              >
                <div className="w-full h-[240px] md:w-full md:h-full">
                  <Image
                    src={teamCard.img}
                    alt="image"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-[17px] text-center">
                    {teamCard.name}
                  </h3>
                  <h3 className="font-normal text-[13px] text-center">
                    {teamCard.text}
                  </h3>
                </div>
              </div>
            );
          })}
        </div> */}

        <div className="w-full grid md:grid-cols-2 items-start md:items-center justify-between md:justify-center space-y-[5rem] md:space-y-0 md:px-[9rem] ">
          {ourTeamCard.map((teamCard, i) => {
            return (
              <div
                className="w-full md:w-[280px] h-[400px]  md:space-y-8"
                key={i}
              >
                <div className="w-full">
                  <Image
                    src={teamCard.img}
                    alt="image"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-[17px] text-center">
                    {teamCard.name}
                  </h3>
                  <h3 className="font-normal text-[13px] text-center">
                    {teamCard.text}
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

export default Team;
