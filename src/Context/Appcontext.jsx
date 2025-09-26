import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [enrollments,setEnrollments] = useState([]);


  const [token, setToken] = useState(
    sessionStorage.getItem("token") ? sessionStorage.getItem("token") : false
  );

  const [courses, setCourses] = useState([]);

  // Fetch courses
  const getCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/list");
      if (data.success) {
        setCourses(data.course);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

    useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          setUser(data.userData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [token, backendUrl]);

 
  useEffect(() => {
    getCourses();
  }, []);


  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  const bookCourse = async (courseId, slotDate, slotTime) => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return { success: false };
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-course`,
        { courseId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        return { success: true, appointment: data.appointment };
      } else {
        toast.error(data.message);
        return { success: false };
      }
    } catch (error) {
      console.log(error)
      toast.error("Booking failed");
      return { success: false };
    }
  };

  // Get user enrollments
  const getMyEnrollments = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/my-enrollments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setEnrollments(data.enrollments);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch enrollments");
    }
  };



  const value = {
    courses,
    setCourses,
    currency,
    token,
    setToken,
    backendUrl,
    user,
    setUser,
    bookCourse,
    enrollments,
    getMyEnrollments
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

