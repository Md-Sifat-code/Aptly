import React, { useContext, useState } from "react";
import { FlatContext } from "../Context_Api/FlatContext";

const Flats = () => {
  const { flats, loading, error } = useContext(FlatContext);
  const [visibleCount, setVisibleCount] = useState(30); // Show the first 36 cards initially

  if (loading) return <p>Loading flats...</p>;
  if (error) return <p>Error: {error}</p>;

  const loadMoreFlats = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Increase visible count by 12
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {flats.slice(0, visibleCount).map((flat, index) => (
          <div
            key={index}
            className="flex flex-col justify-start items-start border border-gray-300 rounded-lg shadow-md p-4 h-full"
          >
            <img
              src={flat.picture}
              alt={flat.title}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h2 className="text-lg flex-grow font-semibold text-start mb-2 w-full">
              {flat.title}
            </h2>
            <p className="text-sm flex-grow text-gray-400 text-start mb-2 w-full">
              {flat.description}
            </p>
            <p className="text-sm font-bold text-start mb-2 w-full">
              Price: {flat.price} BDT
            </p>
            <p
              className={`text-sm font-medium text-start w-full ${
                flat.availability ? "text-green-500" : "text-red-500"
              }`}
            >
              {flat.availability ? "Available" : "Not Available"}
            </p>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {visibleCount < flats.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreFlats}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Flats;
