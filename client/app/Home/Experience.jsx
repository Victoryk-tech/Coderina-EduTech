import React from "react";
import CustomButton from "./CustomButton";
import expCard1 from "../../public/experience-card1.png";
import expCard2 from "../../public/experience-card2.png";
import {
  greenBg2,
  pinkBgR,
  textColor,
  headerBackground,
} from "../utils/constants";
import Image from "next/image";

const Experience = () => {
  const expCard = [
    {
      title: "Our Job Readiness Programs",
      text: [
        "Full Stack Web design (6 Months)",
        "Zero - Full Stack App Development",
        "JAVA, HTML and Python",
        "Software Testing and Certification",
        "Mentoring",
      ],
      textType: "li",
      divType: "ul",
      button: "Register",
      color: greenBg2,
      image: expCard2,
      bg: greenBg2,
    },
    {
      title: "Bring the STEAM Experience to Your Next Celebration!",
      text: [
        "Looking for something different to celebrate your child's birthday? Coderina provides a totally unique party experience with interactive elements that really engage the kids.",
      ],
      textType: "span",
      button: "Contact us",
      color: pinkBgR,
      image: expCard1,
      bg: headerBackground,
    },
  ];

  return (
    <div className="w-full px-2 md:px-4 lg:px-16 lg:py-20">
      <div className="w-full">
        <div className="grid md:grid-cols-2 items-center justify-between space-y-5 md:space-y-0 lg:gap-3">
          {expCard.map((card, i) => (
            <div
              key={i}
              className="space-y-10 rounded-2xl p-7 w-full md:w-[540px] md:h-[660px]"
              style={{ backgroundColor: card.bg }}
              bgcolor={card.color}
            >
              <div className="space-y-4">
                <h1 className="text-[25px] font-semibold leading-[37.6px]">
                  {card.title}
                </h1>
                <div>
                  {card.divType === "ul" ? (
                    <ul className="list-disc">
                      {card.text.map((t, index) => (
                        <li key={index} className="text-[14px] md:[17px]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    card.text.map((t, index) => (
                      <span key={index} className="text-[14px] md:[17px]">
                        {t}
                      </span>
                    ))
                  )}
                </div>
                <CustomButton>{card.button}</CustomButton>
              </div>
              <div className="h-full w-full md:w-[450px] md:h-[340px]">
                <Image
                  src={card.image}
                  alt="imagecard"
                  className="w-full object-cover h-full rounded-3xl"
                  layout="responsive"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
