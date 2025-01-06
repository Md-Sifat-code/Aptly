import React from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa"; // Import an 'X' and 'Envelope' icon
import { useUser } from "../Authentication/UserContext"; // Import useUser custom hook
import { FaHome } from "react-icons/fa";
const ProfileDrawer = ({ closeDrawer }) => {
  const { user } = useUser(); // Use the useUser hook to get the user data

  return (
    <div className="pop fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-end">
      <div className="bg-white px-4 w-full lg:w-96 h-auto max-h-[90vh] shadow-lg  rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-[42px] flex flex-col justify-center mt-12 mr-4">
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
            <h2 className="text-2xl text-center font-bold">
              {user?.username || "User Name"}
            </h2>
            <p className="text-sm text-center text-gray-500">
              {user?.location || "Dhaka, Bangladesh"}
            </p>
            <p className="text-sm text-center text-gray-500">
              {user?.contact || "017xxxxxxxxxx"}
            </p>
            <p className="text-sm text-gray-500 text-center">
              {user?.gmail || "user@gmail.com"}
            </p>
            <button className="btn  w-full mt-2 bg-teal-700 font-bold text-white">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-col  p-4 text-teal-700 border-2  border-teal-700 items-center">
            {/* Display sold properties count */}
            <FaHome size={25} className="mr-2" />
            <p className="text-sm flex flex-col text-center mt-4 text-black">
              {user?.propertiesSold || 0}
              <span>Sold/Rent</span>
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
