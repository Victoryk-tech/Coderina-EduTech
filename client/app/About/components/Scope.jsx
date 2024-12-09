import React from "react";
import scopeImg1 from "../../../public/scope-img1.png";
import scopeImg2 from "../../../public/scope-img2.png";
import scopeImg3 from "../../../public/scope-img3.png";
import scopeImg4 from "../../../public/scope-img4.png";
import SolutionCards from "../../Home/SolutionCards";
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
    <div className="mt-10">
      <div className="py-5 font-bold text-[30px] leading-10">
        <h4> Our Services</h4>
      </div>
      <div className="grid md:grid-cols-4 items-center justify-center space-x-3">
        {scopeCards.map((scopeCard, i) => {
          return (
            <div className="w-[270px] h-[350px]" key={i}>
              {" "}
              <SolutionCards
                key={i}
                {...scopeCard}
                childern3={scopeCard.details}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scope;
