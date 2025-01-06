import React from "react";
import { FaTimes } from "react-icons/fa"; // Import an 'X' icon from react-icons
import { useUser } from "../Authentication/UserContext"; // Import useUser custom hook

const ProfileDrawer = ({ closeDrawer }) => {
  const { user } = useUser(); // Use the useUser hook to get the user data

  return (
    <div className="pop fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-end">
      <div className="bg-white w-80 h-full shadow-lg p-6">
        {/* Close button with icon */}
        <button
          onClick={closeDrawer}
          className="absolute top-4 right-4 p-2 bg-teal-700 text-white rounded-full"
        >
          <FaTimes size={24} /> {/* Use the FaTimes icon */}
        </button>
        <h2 className="text-2xl mb-4">Profile</h2>
        {/* Display user details */}
        {user ? (
          <div>
            <p>Welcome, {user.username}</p>{" "}
            {/* Replace with user.name or other properties */}
            {/* Add more user-specific information */}
          </div>
        ) : (
          <p>No user information available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileDrawer;
