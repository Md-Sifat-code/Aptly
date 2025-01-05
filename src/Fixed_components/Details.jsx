import React, { useContext, useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { PiMapPinAreaFill } from "react-icons/pi";
import { FlatContext } from "../Context_Api/FlatContext";
import {
  FaMapMarkerAlt,
  FaCar,
  FaCouch,
  FaCalendarAlt,
  FaPaw,
} from "react-icons/fa";

export default function Details() {
  const { flats, loading, error } = useContext(FlatContext);
  const { id } = useParams();
  const [flat, setFlat] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedFlat = flats.find((flat) => flat.id === parseInt(id));
      setFlat(selectedFlat);
    }
  }, [flats, id]);

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
                    className="w-full rounded-xl h-full object-cover"
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
                <FaBed className="inline-block text-teal-700" />
                {flat.features}
              </p>
              <p className="text-lg mb-1 text-black font-bold flex flex-row items-center gap-2">
                <FaMapMarkerAlt className="text-teal-700 inline-block" />{" "}
                {flat.location}
              </p>
              <p
                className={`mt-1 mb-6 font-semibold ${
                  flat.availability ? "text-green-400" : "text-red-400"
                }`}
              >
                <strong>Availability: </strong>
                {flat.availability ? "Available" : "Not Available"}
              </p>
              <hr />
              <p className="text-lg mt-6 text-gray-500 flex flex-row items-center gap-2">
                <FaMoneyBill className="text-teal-700 inline-block" />
                <span className="font-bold">{flat.price.toLocaleString()}</span>
                /-
              </p>
              <p className="font-bold flex items-center gap-2">
                <PiMapPinAreaFill className="text-teal-700 inline-block" />
                {flat.propertySize}
                <span className="px-2">Fit</span>
              </p>
              <p className="font-bold mb-6 flex items-center gap-2">
                <BiSolidMessageSquareError className="text-teal-700 inline-block" />
                {flat.restrictions}
              </p>
              <hr />
              <p className="mt-6 text-teal-700 font-bold">About Flat</p>
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
              <div className="p-4 border rounded-xl border-teal-700 flex flex-col mt-3 justify-center items-center">
                <div className="flex flex-row gap-4">
                  <p className="text-sm border-teal-700 px-4 border-r-4 text-gray-700 mb-2">
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
                  <FaCar className="text-teal-700" />
                  <p className="text-sm text-gray-700">
                    Parking: {flat.parking ? "Available" : "Not Available"}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <FaCouch className="text-teal-700" />
                  <p className="text-sm text-gray-700">
                    Furnished: {flat.furnished ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <FaCalendarAlt className="text-teal-700" />
                  <p className="text-sm text-gray-700">
                    Year Built: {flat.yearBuilt || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <FaPaw className="text-teal-700" />
                  <p className="text-sm text-gray-700">
                    Pet Friendly: {flat.petFriendly ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <Link
                to="/checkout"
                className="btn mt-6 w-full bg-teal-700 font-bold hover:bg-teal-900 text-white"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
