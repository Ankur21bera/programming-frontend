import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../Context/Appcontext";

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Step 1: Send OTP
  const sendOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      if (data.success) {
        toast.success(data.message);
        setOtpSent(true);
        setStep(2);
        setTimer(60);
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  // Step 2: Verify OTP
  const verifyOtpHandler = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, { email, otp });
      if (data.success) {
        toast.success(data.message);
        setStep(3);
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error verifying OTP");
    }
  };

  // Step 3: Reset Password
  const resetPasswordHandler = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
        email,
        newPassword,
        confirmNewPassword: confirmPassword,
      });
      if (data.success) {
        toast.success(data.message);
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setOtpSent(false);
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border rounded-lg p-3 w-full mb-4"
          />
          <button
            onClick={sendOtp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg cursor-pointer"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border rounded-lg p-3 w-full mb-2"
          />
          <p className="text-sm text-gray-500">Time remaining: {timer}s</p>
          <button
            onClick={() => { setTimer(60); sendOtp(); }}
            disabled={timer > 0}
            className={`w-full mt-3 py-2 rounded-lg ${timer > 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-yellow-500 text-white"}`}
          >
            Resend OTP
          </button>
          <button
            onClick={verifyOtpHandler}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mt-3 cursor-pointer"
          >
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="border rounded-lg p-3 w-full mb-3"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="border rounded-lg p-3 w-full mb-4"
          />
          <button
            onClick={resetPasswordHandler}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg cursor-pointer"
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
