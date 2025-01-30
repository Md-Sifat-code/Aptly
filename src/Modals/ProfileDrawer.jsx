import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaFlag,
  FaExclamationTriangle,
  FaFacebookMessenger,
} from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { MdWifiCalling3 } from "react-icons/md";
import { IoMailSharp } from "react-icons/io5";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2";
import { useFetchUserData } from "../Authentication/UserDataContext";
import ChattingModal from "../Modals/ChattingModal"; // import the ChattingModal
import { Link } from "react-router-dom";

export default function ProfileDrawer() {
  const { userData, loading } = useFetchUserData();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // State for showing the chat modal
  const [flats, setFlats] = useState([]); // State for storing flats data

  useEffect(() => {
    if (userData) {
      // Fetch flats added by the user
      const fetchFlats = async () => {
        try {
          const response = await fetch(
            `https://baribazar-489l.onrender.com/properties/user/${userData.id}`
          );
          const data = await response.json();
          setFlats(data); // Set the flats data
        } catch (error) {
          console.error("Error fetching flats:", error);
        }
      };

      fetchFlats();
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error: User data not available</div>;
  }

  const handleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };

  return (
    <section>
      <div className="container mt-12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card Section */}
        <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-0">
          <div className="card shadow-xl grid grid-cols-2 gap-6 p-6 bg-white rounded-lg">
            {/* Profile Image and Info */}
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                className="w-[120px] h-[120px] rounded-full border-4 bgr"
                src={userData.profilpic || "/default-avatar.png"}
                alt="Profile"
              />
              <h1 className="font-bold text-teal-700 text-xl">
                @{userData.username}
              </h1>
              <p className="font-semibold text-gray-600 text-sm">
                {userData.address}
              </p>
            </div>
            {/* Rating and Hosting Info */}
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-lg flex text-center flex-col font-semibold text-gray-700">
                5{" "}
                <span className="font-medium text-gray-500 text-xs">
                  Reviews
                </span>
              </p>
              <hr className="w-full border-t-2 border-gray-200" />
              <p className="flex flex-col items-center">
                <p className="flex items-center gap-2 text-xl font-semibold text-teal-600">
                  4.8 <FaStar className="inline-block text-yellow-500" />
                </p>
                <span className="font-medium text-xs text-gray-500">
                  Rating
                </span>
              </p>
              <hr className="w-full border-t-2 border-gray-200" />
              <p className="text-lg flex text-center flex-col font-semibold text-gray-700">
                2{" "}
                <span className="font-medium text-gray-500 text-xs">
                  Hosting
                </span>
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white p-12 border">
            <h1 className="font-bold text-2xl text-gray-800">{`${userData.username}'s Information`}</h1>
            <p className="mt-4 font-medium text-gray-600 flex items-center gap-2">
              <IoMailOutline className="bgt" />
              {userData.email}
            </p>
            <p className="font-medium text-gray-600 flex items-center gap-2">
              <HiOutlinePhoneArrowDownLeft className="bgt" />
              {userData.phone}
            </p>
            <p className="font-medium text-gray-600 flex items-center gap-2">
              <ImProfile className="bgt" />
              {userData.profession}
            </p>
            {/* icons */}
            <div className="flex flex-row gap-4 mt-4 mb-4 bgt text-xl">
              {/* Messenger Icon */}
              <FaFacebookMessenger
                onClick={() => setIsChatModalOpen(true)} // Open the chat modal on click
                className="cursor-pointer"
              />
              {/* Phone Icon - Call */}
              <MdWifiCalling3
                onClick={() => (window.location.href = `tel:${userData.phone}`)}
                className="cursor-pointer"
              />
              {/* Mail Icon - Send Email */}
              <IoMailSharp
                onClick={() =>
                  (window.location.href = `mailto:${userData.email}`)
                }
                className="cursor-pointer"
              />
            </div>
            <label
              htmlFor="my-modal"
              className="mt-5 bgt cursor-pointer hover:underline"
            >
              Learn About the Identity Verification
            </label>
          </div>

          {/* Report User Button */}
          <p
            onClick={handleReportModal}
            className="flex items-center gap-2 mt-5 bgt cursor-pointer px-12 hover:underline"
          >
            <FaFlag className="inline-block" />
            Report the User
          </p>
        </div>

        {/* Right Section (About + Reviews) */}
        <div className="lg:col-span-2 px-12 ">
          {/* About Section */}
          <div className="mt-6 mb-6">
            <h1 className="text-3xl font-bold text-black">
              About {userData.username}
            </h1>
            <p>{userData.bio}</p>
          </div>
          <hr />
          {/* Flats Added Section */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Flats Added by {userData.username}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flats.length > 0 ? (
                flats.map((property) => (
                  <div
                    key={property.id}
                    className="card w-full bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <img
                      src={property.heroImage || "/default-image.png"}
                      alt="Property"
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="p-6 flex flex-col gap-4">
                      <h3 className="text-xl font-semibold text-gray-800 hover:text-teal-600 transition duration-200">
                        {property.shortDescription}
                      </h3>
                      <p className="text-lg font-medium text-gray-600">
                        {property.price}
                      </p>
                      <div className="mt-auto">
                        <Link
                          to={`/details/${property.id}`} // Assuming you have a route to view detailed property
                          className="btn btn-outline bg-teal-500 text-white rounded-lg py-2 px-4 w-full text-center font-bold hover:bg-teal-600 hover:border-teal-600 transition duration-300"
                        >
                          See Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No flats added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Identity Verification */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h2 className="text-xl font-semibold mb-4">
            Identity Verification Information
          </h2>
          <p className="text-gray-600">
            The identity verification process ensures that users are who they
            claim to be. This may involve uploading documents, performing a live
            video verification, or other means to confirm your identity.
          </p>
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-teal-600 absolute right-2 top-2"
          >
            Close
          </label>
        </div>
      </div>

      {/* Modal for Reporting the User */}
      {isReportModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative max-w-lg w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              <FaExclamationTriangle className="inline-block text-red-600" />{" "}
              Report User
            </h2>
            <p className="text-gray-600 mb-4">
              Please select the reason you are reporting this user:
            </p>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Reason for reporting:</span>
              </label>
              <select className="select select-bordered">
                <option>Spam</option>
                <option>Abusive Behavior</option>
                <option>Fake Profile</option>
                <option>Other</option>
              </select>
            </div>
            <textarea
              placeholder="Additional details"
              className="textarea textarea-bordered w-full mb-4"
              rows="4"
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleReportModal}
                className="btn btn-secondary bg-teal-700 border-none text-white font-bold hover:bg-teal-800 btn-sm"
              >
                Cancel
              </button>
              <button className="btn btn-danger btn-sm">Submit Report</button>
            </div>
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-teal-600 absolute right-2 top-2"
              onClick={handleReportModal}
            >
              Close
            </label>
          </div>
        </div>
      )}

      {/* Chatting Modal */}
      {isChatModalOpen && (
        <ChattingModal
          closeModal={() => setIsChatModalOpen(false)}
          username={userData.username}
        />
      )}
    </section>
  );
}
