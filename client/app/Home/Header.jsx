import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import CustomButton from "./CustomButton";
import ImgSlider from "./ImgSlider";
import Vector from "../../public/Vector.png";
import Navbar from "./Navbar";
const Header = () => {
  const containerStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "0.5em",
    padding: "3em 0 4em",
    backgroundImage: Vector,
  };
  return (
    <div className="font-Geist py-10">
      <div
        className="flex flex-col items-center justify-center space-y-9 "
        style={containerStyle}
      >
        <div className=" text-center  lg:space-y-9" width={["default", "65%"]}>
          <h1 className="font-bold leading-9 md:leading-[55px] text-[32px] md:text-[60px] ">
            Youth. Innovation.
          </h1>
          <h1 className="font-bold leading-9 md:leading-[55px] text-[32px] md:text-[60px] ">
            Entrepreneurships.
          </h1>
          <h1 className="font-bold leading-9 md:leading-[55px] text-[32px] md:text-[60px] ">
            Empowerment.
          </h1>
        </div>
        <CustomButton isLarge>
          Get Started <FaArrowRightLong />
        </CustomButton>
      </div>
      <ImgSlider />
    </div>
  );
};

export default Header;
