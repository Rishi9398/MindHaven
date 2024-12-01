import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-[#CBEFFF] rounded-lg w-full h-auto md:h-[558px] overflow-hidden flex flex-col md:flex-row items-center px-6 md:px-20 py-10 md:py-0">
      {/* Blurred Background Circle */}
      <div
        className="absolute w-[634px] h-[634px] bg-[#52BDAA] blur-[500px]"
        style={{
          left: "-376px",
          top: "-457px",
        }}
      ></div>

      {/* Text Content */}
      <div className="md:w-1/2 flex flex-col justify-center items-start relative z-10">
        {/* Heading */}
        <h1 className="text-[#191A15] font-bold text-[36px] md:text-[50px] leading-[50px] md:leading-[90px] max-w-[555px]">
          We’re here to Increase your{" "}
          <span className="text-[#A663CC]">Mental Well Being</span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-base md:text-lg font-medium text-[#000000] max-w-[461px]">
          Let&apos;s make your mental health more organized and easily using
          MindHaven with many of the latest features in managing work every
          day.
        </p>

        {/* Button */}
        <button className="mt-6 md:mt-10 px-6 py-3 bg-[#0D47A1] text-white font-bold text-[18px] md:text-[22px] rounded-[40px] shadow-md">
          Try Free Trial
        </button>
      </div>

      {/* Image Content */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/img/hero1.png"
          alt="Hero Section"
          className="rounded-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default HeroSection;
