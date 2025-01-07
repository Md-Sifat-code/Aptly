import React, { useState } from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa";

import ProfileEditModal from "../Modals/ProfileEditModal";
import { useUserContexts } from "../Authentication/UserContexts"; // Import the custom hook

const ProfileDrawer = ({ closeDrawer }) => {
  const { userData, setUserData, loading } = useUserContexts(); // Use the custom hook
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateUserProfile = (updatedProfile) => {
    setUserData(updatedProfile);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-end">
      {/* Drawer Container */}
      <div className="bg-white px-4 w-full lg:w-96 h-auto max-h-[90vh] shadow-lg rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-[42px] flex flex-col justify-center mt-12 mr-4 transform transition-all duration-300 ease-in-out translate-x-full sm:translate-x-0">
        <button
          onClick={closeDrawer}
          className="absolute top-4 right-3 p-2 bg-teal-700 text-white rounded-full"
        >
          <FaTimes size={24} />
        </button>

        {/* User Profile Details */}
        <div className="flex flex-col gap-6 items-center mb-4">
          <img
            src={userData.profilpic || "/default-avatar.jpg"} // Use profilePicture URL or fallback to default avatar
            alt="Profile"
            className="w-16 h-16 rounded-full"
            onError={(e) => {
              e.target.src = "/default-avatar.jpg"; // Fallback in case the URL is invalid
            }}
          />
          <div>
            <h2 className="text-2xl text-center font-bold">
              {userData.username}
            </h2>
            <p className="text-sm text-center text-gray-500">
              {userData.email}
            </p>
            <button
              onClick={openModal}
              className="btn w-full mt-2 bg-teal-700 font-bold text-white"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Full Name:</span>
            <span>{userData.fullname}</span>
          </div>
          {/* Other user details */}
        </div>

        {/* Send Email */}
        <div className="mt-12">
          <button
            onClick={() => (window.location.href = `mailto:${userData.gmail}`)}
            className="w-full p-2 bg-teal-700 text-white rounded-lg flex items-center justify-center"
          >
            <FaEnvelope size={18} className="mr-2" />
            Send Email
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <ProfileEditModal
          closeModal={closeModal}
          user={userData}
          updateUserProfile={updateUserProfile}
        />
      )}
    </div>
  );
};

export default ProfileDrawer;
