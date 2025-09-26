import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/Appcontext";
import { assets } from "../assets/assets";
import RelatedCourse from "../Components/RelatedCourse";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "flowbite-react"; 

const Enrollment = () => {
  const { couId } = useParams();
  const { courses, currency, bookCourse } = useContext(AppContext);
  const navigate = useNavigate();

  const [courseInfo, setCourseInfo] = useState(null);
  const [courseSlots, setCourseSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchCourseInfo = () => {
    const foundCourse = courses.find((cou) => cou._id === couId);
    setCourseInfo(foundCourse || null);
  };

  const getAvailableSlots = () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      

      while (currentDate < endTime) {
        let startTime = new Date(currentDate);
        let endSlot = new Date(currentDate);
        endSlot.setMinutes(endSlot.getMinutes() + 30); 

        let formattedStart = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let formattedEnd = endSlot.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          dateTime: startTime,
          time: `${formattedStart} - ${formattedEnd}`, 
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setCourseSlots(slots);
  };

  useEffect(() => {
    fetchCourseInfo();
  }, [courses, couId]);

  useEffect(() => {
    if (courseInfo) {
      getAvailableSlots();
    }
  }, [courseInfo]);


  const handleBooking = async() => {
  if(!slotTime) {
    alert("Please Select A Slot First");
    return;
  }

  const slotDate = courseSlots[slotIndex][0].dateTime.toISOString().split("T")[0];
  const result = await bookCourse(courseInfo._id,slotDate,slotTime);

  if(result && result.success) {
    setShowModal(true);
  }
};


  useEffect(() => {
    console.log(courseSlots);
  }, [courseSlots]);

  return (
    courseInfo &&
    courseInfo.mentor && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
         
          <div>
            <img
              className="bg-[#5f6fff] w-full sm:max-w-72 rounded-lg"
              src={courseInfo.mentor.image}
              alt={courseInfo.mentor.name}
            />
          </div>

        
          <div className="flex-1 border border-gray-400 rounded-lg px-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {courseInfo.mentor.name}
              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {courseInfo.mentor.role} - {courseInfo.title}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {courseInfo.level}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {courseInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Course Fees:{" "}
              <span className="text-green-600">
                {currency}
                {courseInfo.price}
              </span>
            </p>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Our Batch Timings</p>
          <div className="flex gap-3 items-center w-full overflow-x-auto whitespace-nowrap scrollbar-hide mt-4">
            {courseSlots.length > 0 &&
              courseSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-blue-500 text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex gap-3 items-center w-full overflow-x-auto whitespace-nowrap scrollbar-hide mt-4">
            {courseSlots.length > 0 &&
              courseSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {item.time}
                </p>
              ))}
          </div>
          <button onClick={handleBooking} className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer">
            Book Your Course
          </button>
        </div>
       <RelatedCourse couId={couId} category={courseInfo.category} />
         <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ModalHeader>Booking Successful </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Your course has been booked successfully!
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="cursor-pointer"
              onClick={() => {
                setShowModal(false);
                navigate("/my-enrollments");
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  );
};

export default Enrollment;
