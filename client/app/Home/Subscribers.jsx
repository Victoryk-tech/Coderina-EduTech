import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import newsLgImg from "../../public/news-ImgLg.png";
const Subscribers = () => {
  return (
    <div className="w-full px-2 md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center space-y-10">
        <p>In collaboration with our valued partners</p>
        <div className="flex items-center space-x-6">
          <CustomButton bold disabled>
            Partner with Us
          </CustomButton>
          <CustomButton bold disabled>
            Become a Sponsor
          </CustomButton>
        </div>
      </div>
      <div className="flex items-start justify-between md:mt-16 lg:px-10 py-8">
        <div>
          <h2>
            Looking for a co-working space or where to host your meeting or
            training?
          </h2>

          <ul className="space-y-3 mt-4">
            <li> Opening Hours: Monday to Friday 9:00 AM - 5:00 PM</li>
            <li> High-Speed Internet Service</li>
            <li> Co office space / Co-working space</li>
            <li> Serviced Office / Office Rental Meeting</li>
            <li>Venue / Seminar / Workshop</li>
          </ul>

          <div className="flex items-center space-x-6 mt-8">
            <CustomButton bold disabled>
              Book Space
            </CustomButton>
            <CustomButton bold disabled>
              Book STEM classes
            </CustomButton>
          </div>
        </div>
        <div>
          <Image src={newsLgImg} alt="image" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Subscribers;
