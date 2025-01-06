import React from "react";

export default function ProfileUpdateModal({ closeModal }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Update Your Profile</h2>
        <p className="mb-4">
          To have a better experience, please update your profile.
        </p>
        <div className="w-full">
          <button
            onClick={closeModal}
            className="bg-[#006d6f] w-full hover:bg-teal-700 px-4 py-2 text-white rounded"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
