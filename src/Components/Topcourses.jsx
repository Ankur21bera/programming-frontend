import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Appcontext";

const Topcourses = () => {
  const navigate = useNavigate();
  const { courses } = useContext(AppContext);
  const [visibleCount, setVisibleCount] = useState(5);

  const toggleCourses = () => {
    if (visibleCount === 5) {
      setVisibleCount(courses.length);
    } else {
      setVisibleCount(5); 
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10">

      <h1 className="text-3xl font-semibold text-center">Top Courses To Enroll</h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600">
        Browse through our curated list of top courses and start learning with
        expert mentors today.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 px-3 sm:px-0">
        {courses.slice(1, visibleCount).map((item, index) => (
          <div
            onClick={() => navigate(`/enrollment/${item._id}`)}
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300 bg-white"
          >
            <img
              className="w-full h-40 object-cover bg-blue-50"
              src={item.image}
              alt={item.title}
            />
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Available
              </div>
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600">{item.level}</p>
            </div>
          </div>
        ))}
      </div>

      {courses.length > 5 && (
        <button
          onClick={toggleCourses}
          className="bg-blue-600 cursor-pointer text-white px-12 py-3 rounded-full mt-6 shadow hover:bg-blue-700 transition"
        >
          {visibleCount === 5 ? "Show More" : "Show Less"}
        </button>
      )}
    </div>
  );
};

export default Topcourses;
