import React, { useState, useEffect } from "react";
import { FaStar, FaFlag, FaExclamationTriangle } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2";
import { useFetchUserData } from "../Authentication/UserDataContext"; // Import the custom hook

export default function ProfileDrawer() {
  const { userData, loading } = useFetchUserData(); // Use the hook to get user data and loading state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // State for report modal visibility

  if (loading) {
    return <div>Loading...</div>; // Show a loading message if data is being fetched
  }

  if (!userData) {
    return <div>Error: User data not available</div>; // Show an error message if user data is null or undefined
  }

  // Toggle Report Modal
  const handleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };

  return (
    <section>
      <div className="container mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Profile Card Section */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="card shadow-xl grid grid-cols-2 gap-6 p-6 bg-white rounded-lg">
            {/* Profile Image and Info */}
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                className="w-[120px] h-[120px] rounded-full border-4 border-teal-500"
                src={userData.profilpic || "/default-avatar.png"} // Default image if profilpic is null or undefined
                alt="Profile"
              />
              <h1 className="font-bold text-teal-700 text-xl">{`@${userData.username}`}</h1>
              <p className="font-semibold text-gray-600 text-sm">
                {userData.address}
              </p>
            </div>
            {/* Rating and Hosting Info */}
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-lg font-semibold text-gray-700">
                5{" "}
                <span className="font-medium text-gray-500 text-xs">
                  Reviews
                </span>
              </p>
              <hr className="w-full border-t-2 border-gray-200" />
              <p className="flex flex-col items-center">
                <p className="flex items-center gap-2 text-xl font-semibold text-teal-600">
                  4.8
                  <FaStar className="inline-block text-yellow-500" />
                </p>
                <span className="font-medium text-xs text-gray-500">
                  Rating
                </span>
              </p>
              <hr className="w-full border-t-2 border-gray-200" />
              <p className="text-lg font-semibold text-gray-700">
                2{" "}
                <span className="font-medium text-gray-500 text-xs">
                  Hosting
                </span>
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white p-12 border">
            <h1 className="font-bold text-2xl text-gray-800">{`${userData.username}'s Information`}</h1>
            <p className="mt-4 font-medium text-gray-600 flex items-center gap-2">
              <IoMailOutline className="text-teal-500" />
              {userData.email}
            </p>
            <p className="font-medium text-gray-600 flex items-center gap-2">
              <HiOutlinePhoneArrowDownLeft className="text-teal-500" />
              {userData.phone}
            </p>
            <p className="font-medium text-gray-600 flex items-center gap-2">
              <ImProfile className="text-teal-500" />
              {userData.profession}
            </p>
            <label
              htmlFor="my-modal"
              className="mt-5 text-teal-600 cursor-pointer hover:underline"
            >
              Learn About the Identity Verification
            </label>
          </div>

          {/* Report User Button */}
          <p
            onClick={handleReportModal}
            className="flex items-center gap-2 mt-5 text-teal-600 cursor-pointer hover:underline"
          >
            <FaFlag className="inline-block" />
            Report the User
          </p>
        </div>

        {/* Empty space for the remaining columns (col-span-2) */}
        <div className="lg:col-span-2">
          {/* Additional content or user statistics can be added here */}
        </div>
      </div>

      {/* Modal for Identity Verification */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h2 className="text-xl font-semibold mb-4">
            Identity Verification Information
          </h2>
          <p className="text-gray-600">
            The identity verification process ensures that users are who they
            claim to be. This may involve uploading documents, performing a live
            video verification, or other means to confirm your identity.
          </p>
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-teal-600 absolute right-2 top-2"
          >
            Close
          </label>
        </div>
      </div>

      {/* Modal for Reporting the User */}
      {isReportModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative max-w-lg w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              <FaExclamationTriangle className="inline-block text-red-600" />{" "}
              Report User
            </h2>
            <p className="text-gray-600 mb-4">
              Please select the reason you are reporting this user:
            </p>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Reason for reporting:</span>
              </label>
              <select className="select select-bordered">
                <option>Spam</option>
                <option>Abusive Behavior</option>
                <option>Fake Profile</option>
                <option>Other</option>
              </select>
            </div>
            <textarea
              placeholder="Additional details"
              className="textarea textarea-bordered w-full mb-4"
              rows="4"
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleReportModal}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button className="btn btn-danger btn-sm">Submit Report</button>
            </div>
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-teal-600 absolute right-2 top-2"
              onClick={handleReportModal}
            >
              Close
            </label>
          </div>
        </div>
      )}
    </section>
  );
}
