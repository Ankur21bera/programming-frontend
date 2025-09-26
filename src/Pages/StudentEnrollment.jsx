import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";
import { AppContext } from "../Context/Appcontext";

const StudentEnrollment = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [enrollments, setEnrollments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Fetch enrollments & notifications
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch enrollments
        const { data } = await axios.get(
          `${backendUrl}/api/user/my-enrollments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data.success) {
          setEnrollments(data.enrollments);

          // Show modal if any cancelled offline booking
          data.enrollments.forEach((item) => {
            if (item.cancelled && item.offlinePending) {
              setModalMessage(
                `Your booking for "${item.courseId?.title}" was cancelled because you did not pay within 3 days.`
              );
              setShowModal(true);
            }
          });
        }

        // Fetch notifications
        // Fetch notifications
        const notifyRes = await axios.get(
          `${backendUrl}/api/user/notifications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (notifyRes.data.success) {
          const notifications = notifyRes.data.notifications || [];
          if (notifications.length > 0 && notifications[0]?.message) {
            setModalMessage(notifications[0].message);
            setShowModal(true);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [backendUrl, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Cancel enrollment
  const handleCancel = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-enrollment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Booking Cancelled");
        setEnrollments((prev) =>
          prev.map((item) =>
            item._id === appointmentId ? { ...item, cancelled: true } : item
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
    }
  };

  // Online Payment
  const handlePay = async (appointmentId, amount, courseTitle) => {
    try {
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }
      const { data } = await axios.post(
        `${backendUrl}/api/user/create-order`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const { order } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your Platform Name",
        description: courseTitle,
        order_id: order.id,
        handler: async function (response) {
          const verify = await axios.post(
            `${backendUrl}/api/user/verify-payment`,
            {
              appointmentId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (verify.data.success) {
            toast.success("Payment successful!");
            setEnrollments((prev) =>
              prev.map((e) =>
                e._id === appointmentId ? { ...e, payment: true } : e
              )
            );
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: { name: "User Name", email: "user@example.com" },
        theme: { color: "#2563EB" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  // Offline Payment
  const handleOfflinePay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/offline-payment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Offline payment requested. Awaiting admin approval.");
        setEnrollments((prev) =>
          prev.map((item) =>
            item._id === appointmentId
              ? { ...item, paymentMode: "offline", offlinePending: true }
              : item
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to request offline payment");
    }
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Enrollments
      </p>

      <div>
        {enrollments.length === 0 ? (
          <p className="text-zinc-600 mt-4">No enrollments yet.</p>
        ) : (
          enrollments.map((item) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={item._id}
            >
              <div>
                <img
                  className="w-32 h-20 object-cover bg-indigo-50"
                  src={item.courseId?.image}
                  alt={item.courseId?.title}
                />
              </div>

              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.courseId?.title}
                </p>
                <p className="text-zinc-700 font-medium mt-1">Mentor:</p>
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={item.courseId?.mentor?.image}
                    alt={item.courseId?.mentor?.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  <p className="text-sm text-neutral-700 font-medium">
                    {item.courseId?.mentor?.name}
                  </p>
                </div>
                <p className="text-sm text-neutral-700 font-medium">
                  Date: {formatDate(item.slotDate)} | Time: {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {/* Status Buttons */}
                {item.cancelled ? (
                  <button
                    disabled
                    className="text-sm text-red-600 text-center sm:min-w-48 py-2 border bg-red-100 cursor-not-allowed"
                  >
                    Booking Cancelled
                  </button>
                ) : item.isCompleted ? (
                  <button
                    disabled
                    className="text-sm text-white bg-green-600 text-center sm:min-w-48 py-2 border rounded-md cursor-not-allowed"
                  >
                    Completed
                  </button>
                ) : !item.payment ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        handlePay(item._id, item.amount, item.courseId.title)
                      }
                      className="text-sm cursor-pointer text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-600 transition-all duration-200 hover:text-white"
                    >
                      Pay Online
                    </button>

                    {item.offlinePending ? (
                      <button
                        disabled
                        className="text-sm text-yellow-600 text-center sm:min-w-48 py-2 border bg-yellow-100 cursor-not-allowed"
                      >
                        Waiting for Approval
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOfflinePay(item._id)}
                        className="text-sm text-stone-500 text-center sm:min-w-48 cursor-pointer py-2 border hover:bg-yellow-500 transition-all duration-200 hover:text-white"
                      >
                        Pay Offline
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    disabled
                    className="text-sm text-white bg-green-600 text-center sm:min-w-48 py-2 border rounded-md cursor-not-allowed"
                  >
                    Paid
                  </button>
                )}

                {/* Cancel button */}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => handleCancel(item._id)}
                    className="text-sm text-stone-500 cursor-pointer text-center sm:min-w-48 py-2 border hover:bg-red-600 transition-all duration-200 hover:text-white"
                  >
                    Cancel Enrollment
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification / Cancel modal */}
      <Modal show={showModal} size="md" onClose={() => setShowModal(false)}>
        <ModalHeader>Notice</ModalHeader>
        <ModalBody>
          <p className="text-sm text-zinc-700">{modalMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StudentEnrollment;

