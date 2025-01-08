import React, { useState } from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiBagSimpleFill } from "react-icons/pi";
import { MdSell } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa";
import { MdAddHomeWork } from "react-icons/md";
import { MdPermPhoneMsg } from "react-icons/md";
import ProfileEditModal from "../Modals/ProfileEditModal";
import { useUserContexts } from "../Authentication/UserContexts";
import ChattingModal from "../Modals/ChattingModal";

const ProfileModal = ({ closeDrawer }) => {
  const { userData, setUserData, loading } = useUserContexts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeProfileEditModal = () => setIsModalOpen(false);

  const openChatModal = () => setIsChatModalOpen(true);
  const closeChatModal = () => setIsChatModalOpen(false);

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
    <div
      className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4"
      onClick={() => closeDrawer()} // Close when clicking outside
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px] max-w-[90vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-teal-700">
            Profile Details
          </h2>
          <button
            onClick={closeDrawer} // Close the parent modal when this button is clicked
            className="p-2 bg-teal-700 text-white rounded-full"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center mt-6">
          <img
            src={userData.profilpic || "/default-avatar.jpg"}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-teal-700"
            onError={(e) => {
              e.target.src = "/default-avatar.jpg";
            }}
          />
          <div className="mt-4 text-center">
            <h3 className="text-2xl font-semibold text-teal-700">
              @{userData.username}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{userData.email}</p>
            <p className="mt-4 text-sm text-gray-600">{userData.bio}</p>

            <div className="mt-4 flex gap-6 justify-center">
              <FaEnvelope
                size={24}
                className="text-teal-700 cursor-pointer"
                onClick={() =>
                  (window.location.href = `mailto:${userData.gmail}`)
                }
              />
              <FaFacebookMessenger
                size={24}
                className="text-teal-700 cursor-pointer"
                onClick={openChatModal}
              />
              <MdPermPhoneMsg
                size={24}
                className="text-teal-700 cursor-pointer"
                onClick={() => (window.location.href = `tel:${userData.phone}`)}
              />
            </div>

            <button
              onClick={openModal}
              className="mt-6 bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-6 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-teal-700" />
            <span>{userData.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <PiBagSimpleFill className="text-teal-700" />
            <span>{userData.profession}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="card p-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-center gap-2">
            <MdSell className="text-teal-700" />
            <span>{userData.sold}</span>
          </div>
          <div className="card p-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-center gap-2">
            <MdAddHomeWork className="text-teal-700" />
            <span>{userData.sold}</span>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isModalOpen && (
        <ProfileEditModal
          closeModal={closeProfileEditModal}
          user={userData}
          updateUserProfile={updateUserProfile}
        />
      )}

      {/* Chat Modal */}
      {isChatModalOpen && (
        <ChattingModal
          closeModal={closeChatModal}
          username={userData.username}
        />
      )}
    </div>
  );
};

export default ProfileModal;
