import React, { useContext, useState } from "react";
import { FlatContext } from "../Context_Api/FlatContext";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa6"; // Importing heart icons
import { Link } from "react-router-dom";
import load from "/loading.gif"; // Ensure the path is correct

const Flats = () => {
  const { flats, loading, error } = useContext(FlatContext);
  const [visibleCount, setVisibleCount] = useState(30); // Show the first 30 cards initially
  const [favourites, setFavourites] = useState(new Set()); // Set to track favorited flats
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedFlat, setSelectedFlat] = useState(null); // Track the selected flat for modal

  console.log(flats);

  // Function to toggle favorite status
  const toggleFavorite = (flatId, event) => {
    event.stopPropagation(); // Prevent routing when clicking the favorite icon
    setFavourites((prevFavourites) => {
      const newFavourites = new Set(prevFavourites);
      if (newFavourites.has(flatId)) {
        newFavourites.delete(flatId); // Remove if already favorited
      } else {
        newFavourites.add(flatId); // Add to favorites
      }
      return newFavourites;
    });
    setSelectedFlat(flatId); // Set the selected flat for modal
    setIsModalOpen(true); // Open the modal
  };

  if (loading)
    return (
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-70 z-50">
        <img src={load} alt="Loading..." className="w-24 mx-auto" />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const loadMoreFlats = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Increase visible count by 12
  };

  return (
    <div className="pop w-[90%] min-h-screen mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6">
        {flats.slice(0, visibleCount).map((flat) => (
          <div
            key={flat.id}
            className="flex flex-col justify-start items-start h-full relative"
          >
            {/* Separate Favorite icon from Link */}
            <div
              onClick={(e) => toggleFavorite(flat.id, e)}
              className="absolute top-2 right-2 cursor-pointer z-10"
            >
              {favourites.has(flat.id) ? (
                <FaHeart className="text-teal-700 text-[27px]" />
              ) : (
                <FaRegHeart className="text-teal-700 text-[27px]" />
              )}
            </div>

            {/* Link for Flat Details */}
            <Link
              to={`/details/${flat.id}`}
              className="flex flex-col justify-start items-start h-full"
            >
              <img
                src={flat.heroImage} // Directly using the URL provided by the backend
                alt={flat.title}
                className="h-[250px] w-full object-cover rounded-[18px] mb-3"
              />
              <p className="text-sm flex items-center gap-2 font-medium text-start w-full">
                {flat.location}
              </p>
              <p className="text-sm flex items-center gap-2 font-normal text-start text-gray-400 w-full">
                Hosted by {flat.user ? flat.user.fullname : "Unknown"}
              </p>

              <p className="text-sm flex items-center text-gray-500 gap-2 font-medium text-start mb-2 mt-1 w-full">
                {flat.price} BDT
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < flats.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreFlats}
            className="px-4 py-2 bgc font-medium pop text-white rounded-md shadow hover:bg-teal-700"
          >
            Load More
          </button>
        </div>
      )}

      {/* Modal using DaisyUI */}
      {isModalOpen && selectedFlat && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal modal-open">
            <div className="modal-box relative">
              <h2 className="text-xl font-semibold mb-4">
                Flat{" "}
                {favourites.has(selectedFlat) ? "Added to" : "Removed from"}{" "}
                Favorites
              </h2>
              <p className="text-lg">
                The flat with ID: {selectedFlat} has been{" "}
                {favourites.has(selectedFlat) ? "added to" : "removed from"}{" "}
                your favorites list.
              </p>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setIsModalOpen(false)} // Close modal
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flats;
