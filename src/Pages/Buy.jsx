import React, { useState, useRef, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { TbFilterCog } from "react-icons/tb";
import Category from "../Fixed_components/Category";
import Flats from "../Fixed_components/Flats";
import { IoMdArrowDropdown } from "react-icons/io";
import { FlatContext } from "../Context_Api/FlatContext"; // Import context to access filterFlats function

export default function Buy() {
  const { filterFlats } = useContext(FlatContext); // Get filterFlats from context
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [petFriendly, setPetFriendly] = useState(null); // Track Pet Friendly filter state
  const [furnished, setFurnished] = useState(null); // Track Furnished filter state
  const [parkingAvailable, setParkingAvailable] = useState(null); // Track Parking Available filter state

  const [petFriendlyOpen, setPetFriendlyOpen] = useState(false);
  const [furnishedOpen, setFurnishedOpen] = useState(false);
  const [parkingAvailableOpen, setParkingAvailableOpen] = useState(false);

  const filterButtonRef = useRef(null);

  // Handle the change in the search input
  // Handle the change in the search input
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Update the search term

    // Trigger search API on each letter change
    filterFlats({
      location: value, // Send the word typed by the user as location
      petFriendly: petFriendly === null ? null : petFriendly, // Send null if not set
      furnished: furnished === null ? null : furnished, // Send null if not set
      parkingAvailable: parkingAvailable === null ? null : parkingAvailable, // Send null if not set
    });
  };

  // Trigger search when user clicks on the search icon
  const handleSearchClick = () => {
    console.log("Searching for: ", searchTerm);
    // Optionally trigger an API call to search for flats based on the current searchTerm
  };

  // Toggle filter dropdown
  const toggleFilterDropdown = () => {
    setFilterOpen(!filterOpen);
  };

  const togglePetFriendly = () => setPetFriendlyOpen(!petFriendlyOpen);
  const toggleFurnished = () => setFurnishedOpen(!furnishedOpen);
  const toggleParkingAvailable = () =>
    setParkingAvailableOpen(!parkingAvailableOpen);

  const handlePetFriendlySelect = (value) => {
    setPetFriendly(value);
    setPetFriendlyOpen(false);
    filterFlats({
      searchTerm,
      petFriendly: value === "none" ? null : value, // If "None" is selected, send null
      furnished,
      parkingAvailable,
    });
  };

  const handleFurnishedSelect = (value) => {
    setFurnished(value);
    setFurnishedOpen(false);
    filterFlats({
      searchTerm,
      petFriendly,
      furnished: value === "none" ? null : value, // If "None" is selected, send null
      parkingAvailable,
    });
  };

  const handleParkingAvailableSelect = (value) => {
    setParkingAvailable(value);
    setParkingAvailableOpen(false);
    filterFlats({
      searchTerm,
      petFriendly,
      furnished,
      parkingAvailable: value === "none" ? null : value, // If "None" is selected, send null
    });
  };

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
                onChange={handleChange} // Trigger POST request on change
                className="w-full py-4 pl-12 pr-16 text-lg rounded-[42px] border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all duration-300 ease-in-out"
                placeholder="Search for a location..."
              />
              <FaSearch
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bgc text-white rounded-full cursor-pointer"
                size={45}
                onClick={handleSearchClick} // Optional: Trigger search on click
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
                175 // 175px is half of 350px to center it
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
                  onClick={() => handlePetFriendlySelect(true)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    petFriendly === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handlePetFriendlySelect(false)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    petFriendly === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* "None" option */}
                <button
                  onClick={() => handlePetFriendlySelect("none")}
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
                  onClick={() => handleFurnishedSelect(true)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    furnished === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleFurnishedSelect(false)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    furnished === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* "None" option */}
                <button
                  onClick={() => handleFurnishedSelect("none")}
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
                  onClick={() => handleParkingAvailableSelect(true)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    parkingAvailable === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleParkingAvailableSelect(false)}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    parkingAvailable === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* "None" option */}
                <button
                  onClick={() => handleParkingAvailableSelect("none")}
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
