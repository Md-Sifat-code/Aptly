import React, { useState, useRef, useContext } from "react";
import { FaSearch } from "react-icons/fa"; // Search Icon
import { TbFilterCog } from "react-icons/tb";
import Category from "../Fixed_components/Category"; // Your category component
import Flats from "../Fixed_components/Flats"; // Your flats component
import { IoMdArrowDropdown } from "react-icons/io";
import { FlatContext } from "../Context_Api/FlatContext"; // Import context to access filterFlats function

export default function Sell() {
  const { filterFlats } = useContext(FlatContext); // Access filterFlats function from context
  const [searchTerm, setSearchTerm] = useState(""); // Store the search term
  const [filterOpen, setFilterOpen] = useState(false); // Manage dropdown visibility
  const [petFriendly, setPetFriendly] = useState(null);
  const [furnished, setFurnished] = useState(null);
  const [parkingAvailable, setParkingAvailable] = useState(null);

  const [petFriendlyOpen, setPetFriendlyOpen] = useState(false); // Manage Pet Friendly dropdown
  const [furnishedOpen, setFurnishedOpen] = useState(false); // Manage Furnished dropdown
  const [parkingAvailableOpen, setParkingAvailableOpen] = useState(false); // Manage Parking dropdown

  const filterButtonRef = useRef(null); // Reference to the filter button to position dropdown

  // Handle the change in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Trigger search when user clicks on the search icon
  const handleSearchClick = () => {
    console.log("Searching for: ", searchTerm);
    filterFlats({
      location: searchTerm, // Send the search term as location
      petFriendly: petFriendly === null ? null : petFriendly, // Send pet filter if set
      furnished: furnished === null ? null : furnished, // Send furnished filter if set
      parkingAvailable: parkingAvailable === null ? null : parkingAvailable, // Send parking filter if set
    });
  };

  // Toggle filter dropdown
  const toggleFilterDropdown = () => {
    setFilterOpen(!filterOpen);
  };

  // Handle toggling each individual dropdown
  const togglePetFriendly = () => setPetFriendlyOpen(!petFriendlyOpen);
  const toggleFurnished = () => setFurnishedOpen(!furnishedOpen);
  const toggleParkingAvailable = () =>
    setParkingAvailableOpen(!parkingAvailableOpen);

  // Handle selection for Pet Friendly filter
  const handlePetFriendlySelect = (value) => {
    setPetFriendly(value);
    setPetFriendlyOpen(false);
    filterFlats({ petFriendly: value, furnished, parkingAvailable });
  };

  // Handle selection for Furnished filter
  const handleFurnishedSelect = (value) => {
    setFurnished(value);
    setFurnishedOpen(false);
    filterFlats({ petFriendly, furnished: value, parkingAvailable });
  };

  // Handle selection for Parking Available filter
  const handleParkingAvailableSelect = (value) => {
    setParkingAvailable(value);
    setParkingAvailableOpen(false);
    filterFlats({ petFriendly, furnished, parkingAvailable: value });
  };

  // Handle "None" selection to reset a filter
  const handleNoneSelect = (filterType) => {
    if (filterType === "petFriendly") {
      setPetFriendly(null);
      filterFlats({ petFriendly: null, furnished, parkingAvailable });
    } else if (filterType === "furnished") {
      setFurnished(null);
      filterFlats({ petFriendly, furnished: null, parkingAvailable });
    } else if (filterType === "parkingAvailable") {
      setParkingAvailable(null);
      filterFlats({ petFriendly, furnished, parkingAvailable: null });
    }
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
                onChange={handleSearchChange} // Only updates the search term
                className="w-full py-4 pl-12 pr-16 text-lg rounded-[42px] border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all duration-300 ease-in-out"
                placeholder="Search for a location..."
              />
              <FaSearch
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bgc text-white rounded-full cursor-pointer"
                size={45}
                onClick={handleSearchClick} // Triggers the API call when clicked
              />
            </div>
            <button
              ref={filterButtonRef} // Reference to the button for positioning
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
          className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 w-[350px]"
          style={{
            top: filterButtonRef.current
              ? filterButtonRef.current.offsetTop +
                filterButtonRef.current.offsetHeight
              : 0,
            left: filterButtonRef.current
              ? filterButtonRef.current.offsetLeft
              : 0,
          }}
        >
          {/* Pet Friendly Section */}
          <div className="mb-4">
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
                  onClick={() => handlePetFriendlySelect(true)} // Set value and filter
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    petFriendly === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handlePetFriendlySelect(false)} // Set value and filter
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    petFriendly === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* None option to reset the filter */}
                <button
                  onClick={() => handleNoneSelect("petFriendly")}
                  className="block w-full text-left p-2 hover:bg-gray-200"
                >
                  None
                </button>
              </div>
            )}
          </div>

          {/* Furnished Section */}
          <div className="mb-4">
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
                  onClick={() => handleFurnishedSelect(true)} // Set value and filter
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    furnished === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleFurnishedSelect(false)} // Set value and filter
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    furnished === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* None option to reset the filter */}
                <button
                  onClick={() => handleNoneSelect("furnished")}
                  className="block w-full text-left p-2 hover:bg-gray-200"
                >
                  None
                </button>
              </div>
            )}
          </div>

          {/* Parking Available Section */}
          <div className="mb-4">
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
                  onClick={() => handleParkingAvailableSelect(true)} // Set value and filter
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    parkingAvailable === true ? "bg-gray-200" : ""
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleParkingAvailableSelect(false)} // Set value and filter
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${
                    parkingAvailable === false ? "bg-gray-200" : ""
                  }`}
                >
                  No
                </button>
                {/* None option to reset the filter */}
                <button
                  onClick={() => handleNoneSelect("parkingAvailable")}
                  className="block w-full text-left p-2 hover:bg-gray-200"
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
