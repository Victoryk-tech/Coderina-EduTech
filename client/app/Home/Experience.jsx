import React from "react";
import CustomButton from "./CustomButton";
import expCard1 from "../../public/experience-card1.png";
import expCard2 from "../../public/experience-card2.png";
import { greenBg2, pinkBgR, textColor } from "../utils/constants";
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
    },
  ];

  return (
    <div className="px-2 md:px-6 lg:px-16 lg:py-16">
      <div className="w-full">
        <div className="grid md:grid-cols-2 items-center justify-between">
          {expCard.map((card, i) => (
            <div key={i} bgcolor={card.color} size={{ xs: 12, md: 5.9 }}>
              <div>
                <p>{card.title}</p>
                <div>
                  {card.text.map((t, index) => (
                    <div key={index}>
                      <span
                        className="text-[14px] md:[17px]"
                        fontSize={{ xs: "14px", md: "17px" }}
                        color={textColor}
                      >
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
                <CustomButton>{card.button}</CustomButton>
              </div>
              <div>
                <Image
                  src={card.image}
                  className="w-full h-full object-contain"
                  alt=""
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
