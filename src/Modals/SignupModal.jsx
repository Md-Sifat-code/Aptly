import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SignupModal = ({ closeModal }) => {
  const [isSuccess, setIsSuccess] = useState(false); // state to control success modal

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://flatelse.onrender.com/User/add", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("Content-Type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("User signed up successfully:", data);
        } else {
          const text = await response.text();
          console.log("User signed up successfully (plain text):", text);
        }
        setIsSuccess(true); // Show success modal
      } else {
        const errorText = await response.text();
        console.error("Failed to sign up:", errorText);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Sign Up
            </h2>
            <p className="text-center text-gray-600">
              Create an account to access all features
            </p>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fullname Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Fullname
                </label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter your full name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Username Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Address Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Phone Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Profile Picture Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profilpic"
                  accept="image/*"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Profession Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Enter your profession"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Bio Input */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  placeholder="Tell us about yourself"
                  rows="3"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Sold Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Sold
                </label>
                <input
                  type="number"
                  name="sold"
                  placeholder="Enter sold count"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Property Added Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Property Added
                </label>
                <input
                  type="number"
                  name="propertyAdded"
                  placeholder="Enter number of properties added"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold hover:bg-teal-600 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal using DaisyUI */}
      {isSuccess && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl font-bold text-teal-500">
                Successfully Signed Up!
              </h2>
              <p className="text-gray-600 mt-4">
                You have successfully created an account.
              </p>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setIsSuccess(false); // Close success modal
                    closeModal(); // Optionally close the Signup modal as well
                  }}
                  className="btn btn-teal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupModal;
