import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-[#5f6fff] to-[#4a54e1] rounded-2xl px-6 md:px-12 lg:px-20 py-12 shadow-lg overflow-hidden">
      
      {/* Left Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Learn From The Best <br /> Courses & Mentors
        </h1>

        <p className="text-base md:text-lg text-gray-100 leading-relaxed">
          Browse through our curated list of courses taught by industry-leading mentors.
          Upgrade your skills and achieve your career goals with ease.
        </p>

        {/* Trusted Mentors */}
        <div className="flex items-center gap-4">
          <img
            src={assets.group_profiles}
            alt="Mentors"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
          <p className="text-sm md:text-base text-gray-100 max-w-[280px]">
            500+ students learning daily with{" "}
            <span className="font-semibold">trusted mentors</span>.
          </p>
        </div>

        {/* CTA */}
        <a
          href="#courses"
          className="inline-flex items-center gap-2 bg-white text-[#4a54e1] px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 w-fit"
        >
          Explore Courses
          <img src={assets.arrow_icon} alt="arrow" className="w-5 h-5" />
        </a>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src={assets.tech_header}
          alt="Education Banner"
          className="w-full max-w-lg rounded-xl shadow-2xl object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
