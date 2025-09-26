import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const Specialitymenu = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-gray-800">
      <h1 className="text-3xl font-semibold">Find By Speciality</h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600">
        Explore our wide range of courses across multiple specialities. Learn from
        industry experts and boost your career.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8 w-full max-w-5xl overflow-x-auto">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/courses/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-full mb-4 border-2 border-gray-200"
            />
            <h2 className="text-sm sm:text-base font-medium text-gray-800">
              {item.speciality}
            </h2>
            <p className="text-xs text-gray-500 text-center mt-2">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Specialitymenu;
