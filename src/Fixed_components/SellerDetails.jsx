import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import ChattingModal from "../Modals/ChattingModal";
import load from "/loading.gif";
export default function SellerDetails() {
  const { username } = useParams();
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await fetch(
          `https://baribazar-489l.onrender.com/User/search/${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch seller details");
        }
        const data = await response.json();
        setSellerData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [username]);

  if (loading)
    return (
      <div className="flex justify-center h-[90vh] items-center">
        <img src={load} className="w-16" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!sellerData) return <div>No seller data available</div>;
  const handleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };
  const reviews = [
    { name: "John Doe", rating: 4, comment: "Great service, very reliable!" },
    {
      name: "Jane Smith",
      rating: 5,
      comment: "Excellent experience, highly recommend.",
    },
    {
      name: "Alice Brown",
      rating: 3,
      comment: "Good, but there's room for improvement.",
    },
  ];

  return (
    <section>
      <div className="container min-h-screen mt-12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card Section */}
        <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-0">
          <div className="card shadow-xl grid grid-cols-2 gap-6 p-6 bg-white rounded-lg">
            {/* Profile Image and Info */}
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                className="w-[120px] h-[120px] rounded-full border-4 bgr"
                src={sellerData.profilpic || "/default-avatar.png"}
                alt="Profile"
              />
              <h1 className="font-bold text-teal-700 text-xl">
                @{sellerData.username}
              </h1>
              <p className="font-semibold text-gray-600 text-sm">
                {sellerData.address}
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
            <h1 className="font-bold text-2xl text-gray-800">{`${sellerData.username}'s Information`}</h1>
            <p className="mt-4 font-medium text-gray-600 flex items-center gap-2">
              <IoMailOutline className="bgt" />
              {sellerData.email}
            </p>
            <p className="font-medium text-gray-600 flex items-center gap-2">
              <HiOutlinePhoneArrowDownLeft className="bgt" />
              {sellerData.phone}
            </p>
            <p className="font-medium text-gray-600 flex items-center gap-2">
              <ImProfile className="bgt" />
              {sellerData.profession}
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
                onClick={() =>
                  (window.location.href = `tel:${sellerData.phone}`)
                }
                className="cursor-pointer"
              />
              {/* Mail Icon - Send Email */}
              <IoMailSharp
                onClick={() =>
                  (window.location.href = `mailto:${sellerData.email}`)
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
              About {sellerData.username}
            </h1>
            <p>{sellerData.bio}</p>
          </div>
          <hr />
          {/* Review Section */}
          <div className="mt-4">
            <h1 className="text-xl font-bold text-gray-800">
              What People are saying about {sellerData.username}
            </h1>
            {/* Review Cards */}
            <div className="flex flex-wrap gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="card my-4 p-6 shadow-lg bg-white rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-teal-700">
                      {review.name}
                    </h2>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="text-gray-600">{review.rating}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
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
          username={sellerData.username}
        />
      )}
    </section>
  );
}
