import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    image: null,
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setUser(data.userData);
          setFormData({
            name: data.userData.name || "",
            phone: data.userData.phone || "",
            address: data.userData.address || "",
            gender: data.userData.gender || "",
            image: null,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [backendUrl]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit update profile
  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const form = new FormData();
      form.append("userId", user._id);
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("address", formData.address);
      form.append("gender", formData.gender);
      if (formData.image) {
        form.append("image", formData.image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        alert("Profile updated successfully!");
        setUser((prev) => ({
          ...prev,
          ...formData,
          image: formData.image ? URL.createObjectURL(formData.image) : prev.image,
        }));
        setIsEditing(false); // go back to view mode
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        {!isEditing ? (
          // ---------------- VIEW MODE ----------------
          <>
            <div className="flex flex-col items-center">
              <img
                src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="text-gray-800">{user.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Address:</span>
                <span className="text-gray-800">{user.address}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Gender:</span>
                <span className="text-gray-800">{user.gender}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsEditing(true)} // 👈 this triggers edit mode
                className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition cursor-pointer"
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          // ---------------- EDIT MODE ----------------
          <>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border rounded-lg"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleUpdate}
                className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)} // cancel edit mode
                className="px-6 py-2 rounded-lg bg-gray-400 text-white font-medium hover:bg-gray-500 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
