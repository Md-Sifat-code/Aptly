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
import { BiSolidMessageSquareError } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { PiMapPinAreaFill } from "react-icons/pi";
import { FlatContext } from "../Context_Api/FlatContext";
import { ImProfile } from "react-icons/im";
import { MdWifiCalling3 } from "react-icons/md";
import { IoMailSharp, IoMailOutline } from "react-icons/io5";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2";
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
              <p className="text-2xl mb-3 text-black font-medium flex flex-row items-center gap-2">
                {flat.shortDescription}
              </p>
              <p className="font-bold flex items-center gap-2">
                <FaBed className="inline-block bgt" />
                {flat.features}
              </p>
              <p className="text-lg mb-1 text-black font-bold flex flex-row items-center gap-2">
                <FaMapMarkerAlt className="bgt inline-block" /> {flat.location}
              </p>
              <p
                className={`text-sm font-medium text-start w-full ${
                  flat.availabilityStatus ? "text-green-500" : "text-red-500"
                }`}
              >
                {flat.availabilityStatus ? "Available" : "Not Available"}
              </p>
              <hr />
              <p className="text-lg mt-6 text-gray-500 flex flex-row items-center gap-2">
                <FaMoneyBill className="bgt inline-block" />
                <span className="font-bold">{flat.price.toLocaleString()}</span>
                /-
              </p>
              <p className="font-bold flex items-center gap-2">
                <PiMapPinAreaFill className="bgt inline-block" />
                {flat.propertySize}
                <span className="px-2">Fit</span>
              </p>
              <p className="font-bold mb-6 flex items-center gap-2">
                <BiSolidMessageSquareError className="bgt inline-block" />
                {flat.restrictions}
              </p>
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
          </div>
        </div>

        <div className="mt-12 flex flex-col lg:flex-row">
          <div className="card flex-1 shadow-xl grid grid-cols-2 gap-6 p-6 bg-white rounded-lg">
            {/* Profile Image and Info */}
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                className="w-[120px] h-[120px] rounded-full border-4 bgr"
                src={flat.user.profilpic || "/default-avatar.png"}
                alt="Profile"
              />
              <h1 className="font-bold text-teal-700 text-xl">
                @{flat.user.username}
              </h1>
              <p className="font-semibold text-gray-600 text-sm">
                {flat.user.address}
              </p>
            </div>
            {/* Rating and Hosting Info */}
            <div className="bg-white border-l-2 border-teal-700 p-12">
              <h1 className="font-bold text-2xl text-gray-800">
                {`${flat.user.username}'s Information`}
              </h1>
              <p className="mt-4 font-medium text-gray-600 flex items-center gap-2">
                <IoMailOutline className="bgt" />
                {flat.user.email}
              </p>
              <p className="font-medium text-gray-600 flex items-center gap-2">
                <HiOutlinePhoneArrowDownLeft className="bgt" />
                {flat.user.phone}
              </p>
              <p className="font-medium text-gray-600 flex items-center gap-2">
                <ImProfile className="bgt" />
                {flat.user.profession}
              </p>
              <div className="flex flex-row gap-4 mt-4 mb-4 bgt text-xl">
                <FaFacebookMessenger
                  onClick={() => setIsChatModalOpen(true)}
                  className="cursor-pointer"
                />
                <MdWifiCalling3
                  onClick={() =>
                    (window.location.href = `tel:${flat.user.phone}`)
                  }
                  className="cursor-pointer"
                />
                <IoMailSharp
                  onClick={() =>
                    (window.location.href = `mailto:${flat.user.email}`)
                  }
                  className="cursor-pointer"
                />
              </div>
              <Link
                to={`/seller/${flat.user.username}`}
                className="btn btn-outline border-teal-700 bgt font-bold hover:bg-teal-900"
              >
                See Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Chatting Modal */}
      {isChatModalOpen && (
        <ChattingModal closeModal={closeModal} username={flat.user.username} />
      )}
    </div>
  );
}
