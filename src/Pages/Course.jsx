import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/Appcontext";

const Course = () => {
  const { speciality } = useParams();
  const { courses } = useContext(AppContext);
  const [filterCourse, setFilterCourse] = useState([]);
  const [showFilter,setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterCourse(courses.filter((cou) => cou.category === speciality));
    } else {
      setFilterCourse(courses);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [courses, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse Our Courses With Expert Mentors</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-blue-500 text-white" : ""}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
          <p
            onClick={() =>
              speciality === "Web Development"
                ? navigate("/courses")
                : navigate("/courses/Web Development")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
    ${
      speciality === "Web Development"
        ? "bg-blue-500 text-white border-blue-600"
        : ""
    }`}
          >
            Web Development
          </p>

          <p
            onClick={() =>
              speciality === "Digital Marketing"
                ? navigate("/courses")
                : navigate("/courses/Digital Marketing")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
              ${
                speciality === "Digital Marketing"
                  ? "bg-blue-500 text-white border-blue-600"
                  : ""
              }`}
          >
            Digital Marketing
          </p>

          <p
            onClick={() =>
              speciality === "Cyber Security"
                ? navigate("/courses")
                : navigate("/courses/Cyber Security")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
              ${
                speciality === "Cyber Security"
                  ? "bg-blue-500 text-white border-blue-600"
                  : ""
              }`}
          >
            Cyber Security
          </p>

          <p
            onClick={() =>
              speciality === "Data Science"
                ? navigate("/courses")
                : navigate("/courses/Data Science")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
              ${
                speciality === "Data Science"
                  ? "bg-blue-500 text-white border-blue-600"
                  : ""
              }`}
          >
            Data Science
          </p>

          <p
            onClick={() =>
              speciality === "App Development"
                ? navigate("/courses")
                : navigate("/courses/App Development")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
              ${
                speciality === "App Development"
                  ? "bg-blue-500 text-white border-blue-600"
                  : ""
              }`}
          >
            App Development
          </p>

          <p
            onClick={() =>
              speciality === "UI/UX"
                ? navigate("/courses")
                : navigate("/courses/UI/UX")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
              ${
                speciality === "UI/UX"
                  ? "bg-blue-500 text-white border-blue-600"
                  : ""
              }`}
          >
            UI/UX
          </p>

          <p
            onClick={() =>
              speciality === "Graphic Design"
                ? navigate("/courses")
                : navigate("/courses/Graphic Design")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
              ${
                speciality === "Graphic Design"
                  ? "bg-blue-500 text-white border-blue-600"
                  : ""
              }`}
          >
            Graphic Design
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 px-3 sm:px-0">
          {filterCourse.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Course;
