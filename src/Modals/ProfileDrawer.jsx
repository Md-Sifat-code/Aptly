import React from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa"; // Import an 'X' and 'Envelope' icon
import { useUser } from "../Authentication/UserContext"; // Import useUser custom hook
import { FaHome } from "react-icons/fa";
const ProfileDrawer = ({ closeDrawer }) => {
  const { user } = useUser(); // Use the useUser hook to get the user data

  return (
    <div className="pop fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-end">
      <div className="bg-white w-72 h-auto max-h-[90vh] shadow-lg p-6 rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-[42px] flex flex-col justify-center mt-12 mr-4">
        {/* Close button with icon */}
        <button
          onClick={closeDrawer}
          className="absolute top-12 right-3 p-2 bg-teal-700 text-white rounded-full"
        >
          <FaTimes size={24} /> {/* Use the FaTimes icon */}
        </button>

        <div className="flex flex-col gap-6 items-center mb-4">
          {/* Display user image */}
          <img
            src={user?.profilePicture || "default-avatar.jpg"} // Use a default avatar if no picture is available
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl">{user?.username || "User Name"}</h2>
            <p className="text-sm text-gray-500">
              {user?.location || "Location"}
            </p>
            <p className="text-sm text-gray-500">
              {user?.contact || "Contact Info"}
            </p>
            <p className="text-sm text-gray-500">{user?.gmail || "Email"}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center">
            {/* Display sold properties count */}
            <FaEnvelope size={20} className="mr-2" />
            <p className="text-sm text-gray-600">
              Properties sold: {user?.propertiesSold || 0}
            </p>
          </div>
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
    </div>
  );
};

export default ProfileDrawer;
