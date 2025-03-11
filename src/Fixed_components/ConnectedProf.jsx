import React from "react";
import { FiUser, FiArrowLeft } from "react-icons/fi";

const ConnectedProf = ({ user, onBack }) => {
  return (
    <div className="w-full bg-white shadow-md p-4 flex items-center gap-3">
      {/* Back Button (for mobile views) */}
      {onBack && (
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <FiArrowLeft size={20} />
        </button>
      )}

      {/* User Avatar */}
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        <FiUser size={24} className="text-gray-600" />
      </div>

      {/* User Info */}
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
        <span
          className={`text-sm ${
            user?.status === "Online" ? "text-green-500" : "text-gray-400"
          }`}
        >
          {user?.status || "Offline"}
        </span>
      </div>
    </div>
  );
};

export default ConnectedProf;
