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
    {
      img: founder1,
      name: "Mr Olajide Ajayi",
      text: "Founder",
    },
    {
      img: founder2,
      name: "Mr Oluwabisi Kelvin Ajayi",
      text: "Director of programs and engagements",
    },
    {
      img: founder3,
      name: "Mr Femi Niyi",
      text: "Chairman Board of trustee",
    },
    {
      img: founder1,
      name: "Mr Olajide Ajayi",
      text: "Founder",
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
              <div
                className="w-full md:w-[250px] h-[300px]  md:space-y-3 rounded-2xl"
                key={i}
              >
                <div className="w-full">
                  <Image
                    src={teamCard.img}
                    alt="image"
                    className="w-full h-full object-contain rounded-2xl"
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
