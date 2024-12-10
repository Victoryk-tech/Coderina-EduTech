import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import CustomButton from "./CustomButton";
import ImgSlider from "./ImgSlider";
import Vector from "../../public/Vector.png";
import Navbar from "./Navbar";
const Header = () => {
  const containerStyle = {
    backgroundImage: "url('path/to/image.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "0.5em",
    padding: "3em 0 4em",
    backgroundImage: Vector,
  };
  return (
    <div className="bg-[#FFF5E5]">
      {/* <Navbar /> */}
      <div
        className="flex flex-col items-center justify-center space-y-9 "
        style={containerStyle}
      >
        <div
          className=" text-center space-y-3 lg:space-y-9"
          width={["default", "65%"]}
        >
          <h1 className="font-bold leading-9 text-[24px] md:text-[50px] ">
            Youth. Innovation.
          </h1>
          <h1 className="font-bold leading-9 text-[24px] md:text-[50px]">
            Entrepreneurships.
          </h1>
          <h1 className="font-bold leading-9 text-[24px] md:text-[50px]">
            Empowerment.
          </h1>
        </div>
        <CustomButton isLarge>
          Get Started <FaArrowRightLong />
        </CustomButton>

        <ImgSlider />
      </div>
    </div>
  );
};

export default Header;
