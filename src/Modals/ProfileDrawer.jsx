import React, { useState } from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa"; // Ensure correct imports
import { useUser } from "../Authentication/UserContext"; // Import useUser custom hook
import ProfileEditModal from "../Modals/ProfileEditModal"; // Import ProfileEditModal component

const ProfileDrawer = ({ closeDrawer }) => {
  const { user, setUser } = useUser(); // Get user data from context
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to update the user profile (callback from the modal)
  const updateUserProfile = (updatedProfile) => {
    setUser(updatedProfile); // Update the user state with the new profile
  };

  return (
    <div className="pop fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-end">
      <div className="bg-white px-4 w-full lg:w-96 h-auto max-h-[90vh] shadow-lg rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-[42px] flex flex-col justify-center mt-12 mr-4">
        {/* Close button with icon */}
        <button
          onClick={closeDrawer}
          className="absolute top-12 right-3 p-2 bg-teal-700 text-white rounded-full"
        >
          <FaTimes size={24} /> {/* FaTimes icon */}
        </button>

        <div className="flex flex-col gap-6 items-center mb-4">
          {/* Display user image */}
          <img
            src={user?.profilePicture || "default-avatar.jpg"} // Use a default avatar if no picture is available
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl text-center font-bold">
              {user?.username || "User Name"}
            </h2>
            <p className="text-sm text-center text-gray-500">
              {user?.email || "user@gmail.com"}
            </p>
            <button
              onClick={openModal}
              className="btn w-full mt-2 bg-teal-700 font-bold text-white"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Display Additional Profile Information */}
        <div className="mt-4 space-y-4">
          {user?.fullname && (
            <div className="flex justify-between">
              <span className="font-semibold">Full Name:</span>
              <span>{user?.fullname}</span>
            </div>
          )}
          {user?.address && (
            <div className="flex justify-between">
              <span className="font-semibold">Address:</span>
              <span>{user?.address}</span>
            </div>
          )}
          {user?.phone && (
            <div className="flex justify-between">
              <span className="font-semibold">Phone:</span>
              <span>{user?.phone}</span>
            </div>
          )}
          {user?.bio && (
            <div className="flex justify-between">
              <span className="font-semibold">Bio:</span>
              <span>{user?.bio}</span>
            </div>
          )}
          {user?.propertiesSold && (
            <div className="flex justify-between">
              <span className="font-semibold">Properties Sold:</span>
              <span>{user?.propertiesSold}</span>
            </div>
          )}
          {user?.propertiesAdded && (
            <div className="flex justify-between">
              <span className="font-semibold">Properties Added:</span>
              <span>{user?.propertiesAdded}</span>
            </div>
          )}
          {user?.profession && (
            <div className="flex justify-between">
              <span className="font-semibold">Profession:</span>
              <span>{user?.profession}</span>
            </div>
          )}
        </div>

        <div className="mt-12">
          {/* Button to mail the user */}
          <button
            onClick={() => (window.location.href = `mailto:${user?.gmail}`)}
            className="w-full p-2 bg-teal-700 text-white rounded-lg flex items-center justify-center"
          >
            <FaEnvelope size={18} className="mr-2" />
            Send Email
          </button>
        </div>
      </div>

      {/* Render Profile Edit Modal */}
      {isModalOpen && (
        <ProfileEditModal
          closeModal={closeModal}
          user={user}
          updateUserProfile={updateUserProfile} // Pass the update function as a prop
        />
      )}
    </div>
  );
};

export default ProfileDrawer;
