import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/Appcontext";
import { useNavigate } from "react-router-dom";

const RelatedCourse = ({ couId, category }) => {
  const { courses } = useContext(AppContext);
  const navigate = useNavigate();

  // Filter courses from the same category excluding current course
  const relatedCourses = courses.filter(
    (course) => course.category === category && course._id !== couId
  );

  if (relatedCourses.length === 0) return null;

useEffect(() => {
  window.scrollTo(0, 0);
}, [couId]);
  
 
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Related Courses</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedCourses.map((course) => (
          <div
            key={course._id}
            onClick={() => navigate(`/enrollment/${course._id}`)}
            className="border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-3 text-lg font-medium text-gray-900">{course.title}</h3>
            <p className="text-sm text-gray-500">{course.level}</p>
            <p className="text-green-600 font-semibold mt-1">
              ${course.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourse;
