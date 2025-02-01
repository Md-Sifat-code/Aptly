import React, { useContext, useEffect, useState } from "react";
import {
  FaMoneyBill,
  FaBed,
  FaMapMarkerAlt,
  FaCar,
  FaCouch,
  FaCalendarAlt,
  FaPaw,
  FaFacebookMessenger,
  FaStar,
  FaFlag,
} from "react-icons/fa";
import { MdElevator } from "react-icons/md";
import { GiPowerGenerator } from "react-icons/gi";
import { GrUserPolice } from "react-icons/gr";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { PiMapPinAreaFill } from "react-icons/pi";
import { FlatContext } from "../Context_Api/FlatContext";
import { ImProfile } from "react-icons/im";
import { MdWifiCalling3 } from "react-icons/md";
import { IoMailSharp, IoMailOutline } from "react-icons/io5";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2"; // Corrected import
import ChattingModal from "../Modals/ChattingModal";
export default function Details() {
  const { flats, loading, error } = useContext(FlatContext);
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const selectedFlat = flats.find((flat) => flat.id === parseInt(id));
      setFlat(selectedFlat);
    }
  }, [flats, id]);

  const closeModal = () => {
    setIsChatModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!flat) return <div>Flat not found</div>;

  const loggedInUsername = sessionStorage.getItem("username");

  const openChatModal = () => {
    if (!loggedInUsername) {
      alert("Please log in to send a message.");
      return;
    }
    setIsChatModalOpen(true);
  };

  // Safely access user properties with null checks
  const user = flat.user || {}; // If flat.user is null, use an empty object as fallback

  return (
    <div className="p-6 mb-32">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 container mx-auto max-w-[1200px]">
        <img
          src={flat.heroImage}
          alt={flat.title}
          className="w-full h-full col-span-1 sm:col-span-2 lg:col-span-3 object-cover rounded-xl mb-4"
        />
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-2 gap-2">
            {flat.imageUrls &&
              flat.imageUrls.length > 0 &&
              flat.imageUrls
                .slice(0, 2)
                .map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`${flat.title} - ${index + 1}`}
                    className="w-full h-full rounded-xl object-cover"
                  />
                ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {flat.imageUrls &&
              flat.imageUrls.length > 2 &&
              flat.imageUrls
                .slice(2, 4)
                .map((imageUrl, index) => (
                  <img
                    key={index + 2}
                    src={imageUrl}
                    alt={`${flat.title} - ${index + 3}`}
                    className="w-full h-full rounded-xl object-cover"
                  />
                ))}
          </div>
        </div>
      </div>

      {/* Other Details */}
      <div className="pop mt-[60px] container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="md:w-3/4 pr-6 flex flex-col justify-between">
            <div>
              <p className="text-2xl mb-1 text-black font-medium flex flex-row items-center gap-2">
                {flat.shortDescription}
              </p>
              <p className="font-medium  flex items-center gap-2">
                {flat.noOfBedrooms} Bed, {flat.noOfBathrooms} Bath,{" "}
                {flat.noOfBalconies} Balconies
              </p>
              <p className="text-sm  mb-1 text-black font-medium flex flex-row items-center gap-2">
                <span className="font-normal text-black">Location:</span>{" "}
                {flat.location}
              </p>
              <p
                className={`text-sm mb-2 flex flex-row items-center gap-2 font-medium text-start w-full ${
                  flat.availabilityStatus ? "text-green-500" : "text-red-500"
                }`}
              >
                <span className="font-normal text-black">Available:</span>
                {flat.availabilityStatus ? "Available" : "Not Available"}
              </p>
              <h1 className="bgt mt-6 font-bold">What This Place Offer</h1>
              <div className="flex flex-col lg:flex-row justify-between items-center lg:mr-24">
                <div>
                  <p className="text-sm mt-2 text-gray-500 flex flex-row items-center gap-2">
                    <span className="font-normal text-black">Price/Rent:</span>
                    <span className="font-normal">
                      {flat.price.toLocaleString()}
                    </span>
                    /-
                  </p>
                  <p className="font-medium text-sm text-gray-500 flex items-center gap-2">
                    <span className="font-normal text-black">Space:</span>
                    {flat.propertySize}
                    <span className="">Fit</span>
                  </p>
                  <p className="font-normal text-gray-500 mb-6 flex text-sm items-center gap-2">
                    <span className="font-normal text-black">
                      Restrictions:
                    </span>
                    {flat.restrictions}
                  </p>
                </div>
                <div>
                  {/* other
                   */}
                  <p
                    className={`text-sm mb-2 font-medium flex flex-row gap-2 items-center text-start w-full ${
                      flat.elevator ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span className="font-normal text-black">Lift :</span>
                    {flat.elevator ? "Available" : "Not Available"}
                  </p>
                  <p
                    className={`text-sm mb-1 flex flex-row gap-2 font-medium text-start w-full ${
                      flat.generator ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span className="font-normal text-black">Generator:</span>
                    {flat.generator ? "Available" : "Not Available"}
                  </p>
                  <p
                    className={`text-sm mb-1 flex flex-row gap-2 font-medium text-start w-full ${
                      flat.security ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span className="font-normal text-black">Security:</span>
                    {flat.security ? "Available" : "Not Available"}
                  </p>
                </div>
              </div>
              <h1 className="bgt font-bold">Distance Mesurement</h1>
              <div>
                <div>
                  <p className="text-sm mt-2 text-gray-500 flex flex-row items-center gap-2">
                    <span className="font-normal text-black">From School</span>
                    <span className="font-normal">{flat.schoolDistance}</span>
                  </p>
                  <p className="font-medium text-sm text-gray-500 flex items-center gap-2">
                    <span className="font-normal text-black">
                      From Hospital
                    </span>
                    {flat.hospitalDistance}
                  </p>
                  <p className="font-normal text-gray-500 mb-6 flex text-sm items-center gap-2">
                    <span className="font-normal text-black">From Road</span>
                    {flat.mainRoadDistance}
                  </p>
                </div>
              </div>
              <hr />
              <p className="mt-6 bgt font-bold">About Flat</p>
              <p className="whitespace-pre-line">{flat.longDescription}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="mt-12 md:mt-0 md:w-3/4 flex flex-col">
            <div className="border p-4 rounded-lg shadow-lg bg-white flex-1">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
                Home Details
              </h3>
              <p className="text-lg text-center text-gray-700 mb-2">
                BDT
                <span className="font-bold px-2 text-black">
                  {flat.price.toLocaleString()}
                </span>
              </p>
              <div className="p-4 border rounded-xl bgr flex flex-col mt-3 justify-center items-center">
                <div className="flex flex-row gap-4">
                  <p className="text-sm bgr px-4 border-r-4 text-gray-700 mb-2">
                    <strong>Owner Name:</strong> {flat.ownerName}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Contact:</strong> {flat.ownerContact}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Property Info:</strong> {flat.propertyType}
                  </p>
                </div>
              </div>

              {/* Property Features Section */}
              <div className="mt-4 grid grid-cols-2 gap-4 px-6">
                <div className="flex items-center justify-start gap-2">
                  <FaCar className="bgt" />
                  <p className="text-sm text-gray-700">
                    Parking: {flat.parking ? "Available" : "Not Available"}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <FaCouch className="bgt" />
                  <p className="text-sm text-gray-700">
                    Furnished: {flat.furnished ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <FaCalendarAlt className="bgt" />
                  <p className="text-sm text-gray-700">
                    Year Built: {flat.yearBuilt || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <FaPaw className="bgt" />
                  <p className="text-sm text-gray-700">
                    Pet Friendly: {flat.petFriendly ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <Link
                to="/checkout"
                className="btn mt-6 w-full bgc font-bold hover:bg-teal-900 text-white"
              >
                Buy Now
              </Link>
            </div>
            <div className="mt-6 flex flex-col w-full justify-end lg:flex-row">
              <div className="card shadow-xl grid grid-cols-2 border w-full gap-6 p-6 bg-white rounded-lg">
                {/* Profile Image and Info */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <img
                    className="w-[120px] h-[120px] rounded-full border-4 bgr"
                    src={user.profilpic || "/default-avatar.png"} // Default avatar if no profilpic
                    alt="Profile"
                  />
                  <h1 className="font-bold text-teal-700 text-xl">
                    @{user.username || "Unknown"}
                  </h1>
                  <p className="font-semibold text-gray-600 text-sm">
                    {user.address || "N/A"}
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
                <Link
                  to={`/seller/${user.username}`}
                  className="btn col-span-2 w-full btn-outline border-teal-700 bgt font-bold hover:bg-teal-900"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatting Modal */}
      {isChatModalOpen && (
        <ChattingModal
          closeModal={closeModal}
          loggedInUsername={loggedInUsername}
          sellerUsername={user.username}
        />
      )}
    </div>
  );
}
