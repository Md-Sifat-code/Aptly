import React, { useContext, useState } from "react";
import { FlatContext } from "../Context_Api/FlatContext";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Flats = () => {
  const { flats, loading, error } = useContext(FlatContext);
  const [visibleCount, setVisibleCount] = useState(30); // Show the first 30 cards initially

  if (loading) return <p>Loading flats...</p>;
  if (error) return <p>Error: {error}</p>;

  const loadMoreFlats = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Increase visible count by 12
  };

  return (
    <div className="pop w-[90%] mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6">
        {flats.slice(0, visibleCount).map((flat) => (
          <Link
            to={`/details/${flat.id}`} // Assuming `flat.id` is the dynamic value you want to pass
            key={flat.id}
            className="flex flex-col justify-start items-start h-full"
          >
            <img
              src={flat.heroImage} // Directly using the URL provided by the backend
              alt={flat.title}
              className="h-[250px] w-full object-cover rounded-[18px] mb-3"
            />
            <h2 className="text-lg flex-grow font-semibold text-start mb-2 w-full">
              {flat.title}
            </h2>
            <p className="text-sm flex-grow text-gray-400 text-start mb-2 w-full">
              {flat.description}
            </p>
            <p className="text-sm flex items-center gap-2 font-bold text-start mb-2 w-full">
              <FaLocationDot className="inline-block" /> {flat.location}
            </p>
            <p className="text-sm flex items-center gap-2 font-bold text-start mb-2 w-full">
              <FaRegMoneyBill1 className="inline-block" /> {flat.price} BDT
            </p>

            <p
              className={`text-sm font-medium text-start w-full ${
                flat.availabilityStatus ? "text-green-500" : "text-red-500"
              }`}
            >
              {flat.availabilityStatus ? "Available" : "Not Available"}
            </p>
          </Link>
        ))}
      </div>
      {/* Load More Button */}
      {visibleCount < flats.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreFlats}
            className="px-4 py-2 bg-[#006d6f] font-bold pop text-white rounded-md shadow hover:bg-teal-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Flats;
