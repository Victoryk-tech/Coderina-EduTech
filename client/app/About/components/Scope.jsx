import React from "react";
import scopeImg1 from "../../../public/scope-img1.png";
import scopeImg2 from "../../../public/scope-img2.png";
import scopeImg3 from "../../../public/scope-img3.png";
import scopeImg4 from "../../../public/scope-img4.png";
import SolutionCards from "../../Home/SolutionCards";
import Image from "next/image";

const Scope = () => {
  const scopeCards = [
    {
      img: scopeImg1,
      text: "STEAM Curriculum Development ",
      details:
        "Designing school programs that integrate coding, robotics, and problem-solving into daily learning.",
    },
    {
      img: scopeImg2,
      text: "Training for Educators",
      details:
        "Offering Continuous Personal and Professional Development Training (CPPDT) for teachers to improve their skills in virtual learning, coding, and STEAM education.",
    },
    {
      img: scopeImg3,
      text: "Project-Based Learning",
      details:
        "Guiding students in solving community challenges using robotics and AI.",
    },
    {
      img: scopeImg4,
      text: "Monitoring & Evaluation",
      details:
        "Providing expert assessments and real-time feedback to enhance project implementation and outcomes.",
    },
  ];

  return (
    <div className="w-full  px-2 md:px-4 lg:px-10 py-10 ">
      <div className="py-5 font-bold text-[30px] leading-10">
        <h4> Our Services</h4>
      </div>
      <div className="w-full grid md:grid-cols-4 items-start md:items-center justify-between space-y-[6rem] md:space-y-0 md:gap-x-5">
        {scopeCards.map((scopeCard, i) => {
          return (
            <div
              className="w-full md:w-[250px] h-[400px]  md:space-y-3"
              key={i}
            >
              <div className="w-full">
                <Image
                  src={scopeCard.img}
                  alt="image"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-[14px]">{scopeCard.text}</h3>
                <p className="text-[14px]">{scopeCard.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scope;
