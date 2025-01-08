import React, { useState } from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiBagSimpleFill } from "react-icons/pi";
import { MdSell } from "react-icons/md";
import { MdAddHomeWork } from "react-icons/md";
import { MdPermPhoneMsg } from "react-icons/md";
import ProfileEditModal from "../Modals/ProfileEditModal";
import { useUserContexts } from "../Authentication/UserContexts";
import { FaFacebookMessenger } from "react-icons/fa6";
import ChattingModal from "../Modals/ChattingModal"; // Import ChattingModal

const ProfileModal = ({ closeDrawer }) => {
  const { userData, setUserData, loading } = useUserContexts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // Track ChattingModal state

  const openModal = () => setIsModalOpen(true);
  const closeProfileEditModal = () => setIsModalOpen(false);

  const openChatModal = () => setIsChatModalOpen(true); // Open ChattingModal
  const closeChatModal = () => setIsChatModalOpen(false); // Close ChattingModal

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
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px] max-w-[90vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex mt-[-12px] justify-end items-center">
          <button
            onClick={closeDrawer} // Close the parent modal when this button is clicked
            className="p-2 bg-teal-700 text-white rounded-full"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center mt-2">
          <img
            src={userData.profilpic || "/default-avatar.jpg"}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-teal-700"
            onError={(e) => {
              e.target.src = "/default-avatar.jpg";
            }}
          />
          <div className="mt-2 text-center">
            <h3 className="text-2xl font-semibold text-teal-700">
              @{userData.username}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{userData.email}</p>
            <div className="mt-2 mb-4 flex gap-6 justify-center">
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
                onClick={openChatModal} // Trigger ChattingModal on click
              />
              <MdPermPhoneMsg
                size={24}
                className="text-teal-700 cursor-pointer"
                onClick={() => (window.location.href = `tel:${userData.phone}`)}
              />
            </div>
            <hr />
            <p className="mt-8 text-sm text-start text-gray-600">
              {userData.bio}
            </p>
            <div className="mt-2 flex flex-col justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-teal-700" />
                <span>{userData.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <PiBagSimpleFill className="text-teal-700" />
                <span>{userData.profession}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdPermPhoneMsg className="text-teal-700" />
                <span>{userData.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-6">
          <div className="card p-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-center gap-2">
            <MdSell className="text-teal-700" />
            <span>{userData.sold}</span>
          </div>
          <div className="card p-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-center gap-2">
            <MdAddHomeWork className="text-teal-700" />
            <span>{userData.sold}</span>
          </div>
        </div>
        <button
          onClick={openModal}
          className="mt-8 w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-6 rounded-lg"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Edit Modal */}
      {isModalOpen && (
        <ProfileEditModal
          closeModal={closeProfileEditModal}
          user={userData}
          updateUserProfile={updateUserProfile}
        />
      )}

      {/* Chatting Modal */}
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
