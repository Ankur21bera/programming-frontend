import React, { useContext, useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [mode, setMode] = useState("Sign Up");
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    qualification: "",
    age: "",
  });

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // ✅ Validation
  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password.trim()) errors.password = "Password is required";

    if (mode === "Sign Up") {
      if (!formData.name.trim()) errors.name = "Full name is required";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      if (!formData.address.trim()) errors.address = "Address is required";
      if (!formData.qualification.trim())
        errors.qualification = "Qualification is required";
      if (!formData.age.trim()) errors.age = "Age is required";
      if (!formData.confirmPassword.trim())
        errors.confirmPassword = "Confirm your password";
      if (
        formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
      ) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
    return errors;
  };

  const errors = validate();

  // ✅ Handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBlur = (field) => setTouched({ ...touched, [field]: true });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // show all touched errors if invalid
    if (Object.keys(errors).length > 0) {
      setTouched(
        Object.keys(errors).reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {})
      );
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        if (mode === "Sign Up") {
          const { data } = await axios.post(
            backendUrl + "/api/user/register",
            formData
          );

          if (data.success) {
            if (data.success) {
              toast.success("Registration Successful");
              sessionStorage.setItem("token", data.token);
              setToken(data.token);
              navigate("/"); // 👈 this makes Navbar rerender instantly
            }
          } else {
            toast.error(data.message);
          }
        } else {
          const { data } = await axios.post(backendUrl + "/api/user/login", {
            email: formData.email,
            password: formData.password,
          });

          if (data.success) {
            toast.success("Login Successful");
            sessionStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/"); // redirect after login
          } else {
            toast.error(data.message);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center justify-center px-4"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 w-full sm:max-w-2xl border rounded-xl bg-white shadow-lg text-zinc-700">
          <p className="text-2xl font-semibold">
            {mode === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Please {mode === "Sign Up" ? "sign up" : "log in"} to continue
          </p>

          {/* LOGIN FORM */}
          {mode === "Login" && (
            <>
              {/* Email */}
              <div className="w-full">
                <p>Email</p>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  placeholder="Enter your email"
                  className={`border rounded w-full p-2 mt-1 focus:outline-none ${
                    touched.email && errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="w-full">
                <p>Password</p>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter your password"
                  className={`border rounded w-full p-2 mt-1 focus:outline-none ${
                    touched.password && errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="w-full text-right mt-1">
                <Link
                  to="/forgot-password"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </>
          )}

          {/* SIGN UP FORM */}
          {mode === "Sign Up" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {[
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "password", label: "Password", type: "password" },
                {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  type: "password",
                },
                { name: "phone", label: "Phone", type: "text" },
                { name: "address", label: "Address", type: "text" },
                { name: "qualification", label: "Qualification", type: "text" },
                { name: "age", label: "Age", type: "number" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <p>{label}</p>
                  <input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    onBlur={() => handleBlur(name)}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    className={`border rounded w-full p-2 mt-1 focus:outline-none ${
                      touched[name] && errors[name]
                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                        : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                  {touched[name] && errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md text-base cursor-pointer transition mt-4"
          >
            {loading
              ? "Loading..."
              : mode === "Sign Up"
              ? "Create Account"
              : "Login"}
          </button>

          {/* Toggle */}
          <p className="text-sm">
            {mode === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setMode("Login")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setMode("Sign Up")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Sign up here
                </span>
              </>
            )}
          </p>
        </div>
      </form>

      {/* Success Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>🎉 Registration Successful</ModalHeader>
        <ModalBody>
          <p className="text-base text-gray-700">
            Your account has been created successfully.
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              setOpenModal(false);
              navigate("/my-profile");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Edit Profile
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
              navigate("/");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            OK
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Login;
