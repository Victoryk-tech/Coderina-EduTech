import React from "react";

const AboutHeader = () => {
  return (
    <div className="px-2 md:px-4 lg:px-16 ">
      <div className="pt-[3rem] md:pt-[5rem] flex flex-col items-center justify-center bg-[#FFF9F0] font-Geist py-4 rounded-[16px] px-2 md:py-2 lg:py-16 lg:px-24">
        <div className="text-center space-y-8 md:space-y-4">
          <button className="border-[#7A4F03] border-[1px] rounded-3xl text-[#7A4F03] p-2 text-[14px] font-normal">
            About Us
          </button>
          <h1 className="text-[30px] md:text-[40px] font-semibold leading-10 md:leading-[48px]">
            Coderina is a leading non-profit organization focused on
            transforming education in Africa
          </h1>
          <p className="font-normal text-[20px] md:text-[24px] leading-9">
            Based in Nigeria, we specialize in providing technology-driven
            solutions that empower students and educators through STEAM
            (Science, Technology, Engineering, Arts, and Mathematics) education.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
