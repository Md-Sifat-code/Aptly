import React, { useState } from "react";
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
import ChattingModal from "../Modals/ChattingModal";

export default function SellerDetails() {
  const { userData, loading } = useFetchUserData();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error: User data not available</div>;
  }

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
      <div className="container mt-12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card Section */}
        <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-0">
          <div className="card shadow-xl grid grid-cols-2 gap-6 p-6 bg-white rounded-lg">
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
            <div className="flex flex-row gap-4 mt-4 mb-4 bgt text-xl">
              <FaFacebookMessenger
                onClick={() => setIsChatModalOpen(true)}
                className="cursor-pointer"
              />
              <MdWifiCalling3
                onClick={() => (window.location.href = `tel:${userData.phone}`)}
                className="cursor-pointer"
              />
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

          <p
            onClick={handleReportModal}
            className="flex items-center gap-2 mt-5 bgt cursor-pointer px-12 hover:underline"
          >
            <FaFlag className="inline-block" />
            Report the User
          </p>
        </div>

        <div className="lg:col-span-2 px-12 ">
          <div className="mt-6 mb-6">
            <h1 className="text-3xl font-bold text-black">
              About {userData.username}
            </h1>
            <p>{userData.bio}</p>
          </div>
          <hr />
          <div className="mt-4">
            <h1 className="text-xl font-bold text-gray-800">
              What People are saying about {userData.username}
            </h1>
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

      {isChatModalOpen && (
        <ChattingModal
          closeModal={() => setIsChatModalOpen(false)}
          username={userData.username}
        />
      )}
    </section>
  );
}
