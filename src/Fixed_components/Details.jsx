import React, { useContext, useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { Link, useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { PiMapPinAreaFill } from "react-icons/pi";
import { FlatContext } from "../Context_Api/FlatContext"; // Import the FlatContext
import {
  FaMapMarkerAlt,
  FaCar,
  FaCouch,
  FaCalendarAlt,
  FaPaw,
} from "react-icons/fa"; // Correct imports for icons

export default function Details() {
  const { flats, loading, error } = useContext(FlatContext); // Use context to get the data
  const { id } = useParams(); // Use useParams to get the `id` from the URL
  const [flat, setFlat] = useState(null);

  useEffect(() => {
    // Check if id exists before using it
    if (id) {
      const selectedFlat = flats.find((flat) => flat.id === parseInt(id));
      setFlat(selectedFlat);
    }
  }, [flats, id]); // Re-run when flats or the id changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!flat) return <div>Flat not found</div>;

  return (
    <div className="p-6 mb-32">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 container mx-auto max-w-[900px]">
        <img
          src={flat.heroImage}
          alt={flat.title}
          className="w-full h-full col-span-1 sm:col-span-2 lg:col-span-3 object-cover rounded-xl mb-4"
        />
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-2 gap-2">
            {/* First Div with Two Images */}
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
            {/* Second Div with Next Two Images */}
            {flat.imageUrls &&
              flat.imageUrls.length > 2 &&
              flat.imageUrls.slice(2, 4).map((imageUrl, index) => (
                <img
                  key={index + 2} // Adjust index to avoid key collision
                  src={imageUrl}
                  alt={`${flat.title} - ${index + 3}`}
                  className="w-full h-full rounded-xl object-cover"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Other Details */}
      <div className="pop mt-[100px] container mx-auto max-w-[900px]">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 pr-6">
            <p className="text-2xl mb-3 text-black font-bold flex flex-row items-center gap-2">
              <FaMapMarkerAlt className=" text-teal-700 inline-block" />{" "}
              {flat.location}
            </p>
            <p>{flat.longDescription}</p>
            <p className="text-lg text-gray-500 flex flex-row items-center gap-2">
              <FaMoneyBill className=" text-green-500 inline-block" />
              <span className=" font-bold">{flat.price.toLocaleString()}</span>
              /-
            </p>
            <p className="font-bold flex items-center gap-2">
              <PiMapPinAreaFill className=" inline-block" />
              {flat.propertySize}
              <span className="px-2">Fit</span>
            </p>
            <p className="mt-4">{flat.description}</p>
            <p className="mt-4">
              <strong>Availability: </strong>
              {flat.availability ? "Available" : "Not Available"}
            </p>
          </div>
          <div className="mt-12 md:mt-0 md:w-3/4">
            {/* Professional Card for Owner Details */}
            <div className="border p-4 rounded-lg shadow-lg bg-white">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-800 ">
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
                <div className="flex items-center justify-start  gap-2">
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
              <Link className="btn mt-6 w-full bg-teal-700 font-bold text-white">
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
