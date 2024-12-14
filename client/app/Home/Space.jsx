import React from "react";
import Image from "next/image";
import newsLgImg from "../../public/news-ImgLg.png";
import CustomButton from "./CustomButton";
const Space = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 rounded-2xl mt-16 px-5 lg:px-16 py-8 bg-white">
      <div>
        <h2 className="text-[20px] font-semibold md:text-[24px] leading-8 md:w-[70%]">
          Looking for a co-working space or where to host your meeting or
          training?
        </h2>

        <ul className="space-y-2 mt-4 list-disc pl-6">
          <li>Opening Hours: Monday to Friday, 9:00 AM - 5:00 PM</li>
          <li>High-Speed Internet Service</li>
          <li>Co-office space / Co-working space</li>
          <li>Serviced Office / Office Rental Meeting</li>
          <li>Venue / Seminar / Workshop</li>
        </ul>

        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mt-2">
          <CustomButton bold disabled>
            Book Space
          </CustomButton>
          <CustomButton bold disabled>
            Book STEM classes
          </CustomButton>
        </div>
      </div>
      <div className="hidden md:block md:w-[600px] h-[380px]">
        <Image
          src={newsLgImg}
          alt="image"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Space;
