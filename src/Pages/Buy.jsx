import React, { useState, useRef, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { TbFilterCog } from "react-icons/tb";
import Category from "../Fixed_components/Category";
import Flats from "../Fixed_components/Flats";
import { IoMdArrowDropdown } from "react-icons/io";
import { FlatContext } from "../Context_Api/FlatContext"; // Import context to access filterFlats function

export default function Buy() {
  const { filterFlats } = useContext(FlatContext); // Get filterFlats from context
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [filterOpen, setFilterOpen] = useState(false);
  const [petFriendly, setPetFriendly] = useState(null); // Track Pet Friendly filter state
  const [furnished, setFurnished] = useState(null); // Track Furnished filter state
  const [parkingAvailable, setParkingAvailable] = useState(null); // Track Parking Available filter state

  const [petFriendlyOpen, setPetFriendlyOpen] = useState(false);
  const [furnishedOpen, setFurnishedOpen] = useState(false);
  const [parkingAvailableOpen, setParkingAvailableOpen] = useState(false);

  const filterButtonRef = useRef(null);

  // Handle changes in the search input, update state
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Update search term state
  };

  // Trigger the filter API request for search term
  const handleSearchClick = () => {
    console.log("Searching for: ", searchTerm); // Log search term (or replace this with the API call)

    // Trigger API call only when the user clicks the search button
    filterFlats({
      location: searchTerm, // Send search term as location
      petFriendly: petFriendly === null ? null : petFriendly, // Send pet filter if set
      furnished: furnished === null ? null : furnished, // Send furnished filter if set
      parkingAvailable: parkingAvailable === null ? null : parkingAvailable, // Send parking filter if set
    });
  };

  // Handle changes in pet friendly filter (trigger the API call)
  const handlePetFriendlyChange = (value) => {
    setPetFriendly(value);
    filterFlats({
      location: searchTerm, // Keep the search term
      petFriendly: value === "none" ? null : value, // Send null if "None" is selected
      furnished,
      parkingAvailable,
    });
  };

  // Handle changes in furnished filter (trigger the API call)
  const handleFurnishedChange = (value) => {
    setFurnished(value);
    filterFlats({
      location: searchTerm, // Keep the search term
      petFriendly,
      furnished: value === "none" ? null : value, // Send null if "None" is selected
      parkingAvailable,
    });
  };

  // Handle changes in parking available filter (trigger the API call)
  const handleParkingAvailableChange = (value) => {
    setParkingAvailable(value);
    filterFlats({
      location: searchTerm, // Keep the search term
      petFriendly,
      furnished,
      parkingAvailable: value === "none" ? null : value, // Send null if "None" is selected
    });
  };

  // Toggle filter dropdown visibility
  const toggleFilterDropdown = () => {
    setFilterOpen(!filterOpen);
  };

  // Toggle individual filter dropdowns
  const togglePetFriendly = () => setPetFriendlyOpen(!petFriendlyOpen);
  const toggleFurnished = () => setFurnishedOpen(!furnishedOpen);
  const toggleParkingAvailable = () =>
    setParkingAvailableOpen(!parkingAvailableOpen);

  return (
    <>
      <section className="py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar Section */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-4 mb-3">
            {/* Search Bar Wrapper */}
            <div className="relative w-full md:w-1/2 lg:w-2/3">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange} // Only updates the search term
                className="w-full py-4 pl-12 pr-16 text-lg rounded-[42px] border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all duration-300 ease-in-out"
                placeholder="Search for a location..."
              />
              <FaSearch
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bgc text-white rounded-full cursor-pointer"
                size={45}
                onClick={handleSearchClick} // Triggers the API call
              />
            </div>
            <button
              ref={filterButtonRef}
              className="btn rounded-2xl h-16 px-6 flex justify-center items-center font-bold bgc text-white"
              onClick={toggleFilterDropdown}
            >
              <TbFilterCog className="text-white font-bold text-xl" />
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* Filter Dropdown */}
      {filterOpen && (
        <div
          className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 max-w-[350px] w-full md:max-w-[350px] md:left-0 md:right-0"
          style={{
            top: filterButtonRef.current
              ? filterButtonRef.current.offsetTop +
                filterButtonRef.current.offsetHeight
              : 0,
            left: filterButtonRef.current
              ? filterButtonRef.current.offsetLeft +
                filterButtonRef.current.offsetWidth / 2 -
                175 // Center on the button
              : 0,
          }}
        >
          {/* Pet Friendly Section */}
          <div className="mb-4 px-4">
            <div
              onClick={togglePetFriendly}
              className="flex flex-row justify-between items-center"
            >
              <h4 className="font-semibold text-lg">
                Pet Friendly{" "}
                {petFriendly !== null && (petFriendly ? "(Yes)" : "(No)")}
              </h4>
              <IoMdArrowDropdown className="text-xl" />
            </div>
            {petFriendlyOpen && (
              <div>
                <button
                  onClick={() => handlePetFriendlyChange(true)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    petFriendly === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handlePetFriendlyChange(false)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    petFriendly === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* "None" option */}
                <button
                  onClick={() => handlePetFriendlyChange("none")}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    petFriendly === null ? "bg-gray-200" : ""
                  }`}
                >
                  None
                </button>
              </div>
            )}
          </div>

          {/* Furnished Section */}
          <div className="mb-4 px-4">
            <div
              onClick={toggleFurnished}
              className="flex flex-row justify-between items-center"
            >
              <h4 className="font-semibold text-lg">
                Furnished {furnished !== null && (furnished ? "(Yes)" : "(No)")}
              </h4>
              <IoMdArrowDropdown className="text-xl" />
            </div>
            {furnishedOpen && (
              <div>
                <button
                  onClick={() => handleFurnishedChange(true)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    furnished === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleFurnishedChange(false)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    furnished === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* "None" option */}
                <button
                  onClick={() => handleFurnishedChange("none")}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    furnished === null ? "bg-gray-200" : ""
                  }`}
                >
                  None
                </button>
              </div>
            )}
          </div>

          {/* Parking Available Section */}
          <div className="mb-4 px-4">
            <div
              onClick={toggleParkingAvailable}
              className="flex flex-row justify-between items-center"
            >
              <h4 className="font-semibold text-lg">
                Available Parking{" "}
                {parkingAvailable !== null &&
                  (parkingAvailable ? "(Yes)" : "(No)")}
              </h4>
              <IoMdArrowDropdown className="text-xl" />
            </div>
            {parkingAvailableOpen && (
              <div>
                <button
                  onClick={() => handleParkingAvailableChange(true)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    parkingAvailable === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleParkingAvailableChange(false)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    parkingAvailable === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* "None" option */}
                <button
                  onClick={() => handleParkingAvailableChange("none")}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    parkingAvailable === null ? "bg-gray-200" : ""
                  }`}
                >
                  None
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
