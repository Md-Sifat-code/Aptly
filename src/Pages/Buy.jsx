import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Search Icon
import Category from "../Fixed_components/Category"; // Your category component
import Flats from "../Fixed_components/Flats"; // Your flats component

export default function Buy() {
  const [searchTerm, setSearchTerm] = useState(""); // Store the search term

  // Handle the change in the search input
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Trigger search when user clicks on the search icon
  const handleSearchClick = () => {
    console.log("Searching for: ", searchTerm);
    // You can replace this with your actual search functionality
  };

  return (
    <>
      <section className="py-2 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar Section */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-4 mb-8">
            {/* Search Bar Wrapper */}
            <div className="relative w-full md:w-1/2 lg:w-2/3">
              <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                className="w-full py-4 pl-12 pr-4 text-lg rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all duration-300 ease-in-out"
                placeholder="Search for a location..."
              />
              <FaSearch
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-700 cursor-pointer"
                size={20}
                onClick={handleSearchClick} // Trigger search on click
              />
            </div>
          </div>
        </div>
        <hr className="border-t-1 border-gray-200" />
      </section>

      {/* Category and Flats Sections */}
      <section>
        <Category />
      </section>
      <section>
        <Flats />
      </section>
    </>
  );
}
