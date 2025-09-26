import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';

const Banner = () => {
  const navigate = useNavigate();
  const handleEnrollClick = () => {
    toast.error("Please Login First Before You Enroll The Course")
    navigate('/login');
  }

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 overflow-hidden shadow-lg">
   
      <div className="flex-1 py-10 md:py-16 lg:py-20 text-center md:text-left z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug drop-shadow-md">
          Learn New Skills
          <br />
          <span className="text-yellow-300">From Top Instructors</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base lg:text-lg text-blue-100 max-w-lg mx-auto md:mx-0">
          Explore our wide range of tech and professional courses designed to help you grow.  
          Upgrade your skills, boost your career, and start learning today.
        </p>

        <button
          onClick={handleEnrollClick}
          className="mt-6 bg-yellow-300 text-gray-900 cursor-pointer text-sm sm:text-base font-medium px-8 py-3 rounded-full shadow-md hover:scale-105 hover:bg-yellow-400 transition-transform"
        >
          Enroll Courses
        </button>
      </div>

      <div className="flex justify-center md:justify-end md:w-1/2 lg:w-[380px] mt-10 md:mt-0">
        <img
          className="w-full max-w-sm md:max-w-md object-contain drop-shadow-xl"
          src={assets.tech_banner}
          alt="Doctor Banner"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
    </div>
  );
};

export default Banner;
