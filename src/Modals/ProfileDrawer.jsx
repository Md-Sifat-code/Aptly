import React, { useState } from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiBagSimpleFill } from "react-icons/pi";
import { MdSell } from "react-icons/md";
import { MdAddHomeWork } from "react-icons/md";
import { MdPermPhoneMsg } from "react-icons/md";
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
      <div
        className="bg-white px-4 w-full h-auto sm:w-96 max-h-screen sm:max-h-[90vh] shadow-lg 
          rounded-bl-lg rounded-br-lg sm:rounded-tl-lg sm:rounded-tr-[42px] 
          flex flex-col justify-center sm:mt-12 sm:mr-4 
          transform transition-all duration-300 ease-in-out"
      >
        <button
          onClick={closeDrawer}
          className="absolute top-4 right-3 p-2 bg-teal-700 text-white rounded-full"
        >
          <FaTimes size={24} />
        </button>

        {/* User Profile Details */}
        <div className="flex flex-col gap-6 items-center mb-4 mt-6 sm:mt-0">
          <img
            src={userData.profilpic || "/default-avatar.jpg"} // Use profilePicture URL or fallback to default avatar
            alt="Profile"
            className="w-36 h-36 rounded-full"
            onError={(e) => {
              e.target.src = "/default-avatar.jpg"; // Fallback in case the URL is invalid
            }}
          />
          <div>
            <h2 className="text-2xl text-center font-bold">
              <span className="text-teal-700 px-1">@</span>
              {userData.username}
            </h2>
            <p className="text-sm text-center text-gray-500">
              {userData.email}
            </p>
            <p className="text-sm text-center text-gray-500 mt-2">
              {userData.bio}
            </p>
            <div className="flex items-center justify-center">
              <button
                onClick={openModal}
                className="btn px-6 mt-4 bg-teal-700 hover:bg-teal-800 font-bold text-white"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4 border card shadow-lg flex justify-center items-center flex-col pop">
          <div className="p-6">
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold">
                <FaLocationDot className="text-teal-700 font-bold inline-block" />
              </span>
              <span>{userData.address}</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold">
                <MdPermPhoneMsg className="text-teal-700" />
              </span>{" "}
              {userData.phone}
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold">
                <PiBagSimpleFill className="text-teal-700" />
              </span>{" "}
              {userData.profession}
            </div>
          </div>
        </div>

        {/* Property Part */}
        <div className="grid grid-cols-2 gap-4 items-center mt-4">
          <div className="border card shadow-lg p-6 flex justify-center items-center flex-col gap-2 pop">
            <span className="font-semibold">
              <MdSell className="text-teal-700" />
            </span>{" "}
            {userData.sold}
          </div>
          <div className="border card shadow-lg p-6 flex justify-center items-center flex-col gap-2 pop">
            <span className="font-semibold">
              <MdAddHomeWork className="text-teal-700" />
            </span>{" "}
            {userData.sold}
          </div>
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
          className="w-full h-screen sm:w-[30rem] sm:h-auto"
        />
      )}
    </div>
  );
};

export default ProfileDrawer;
