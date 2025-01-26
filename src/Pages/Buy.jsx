import React, { useState, useRef, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { FlatContext } from "../Context_Api/FlatContext"; // Import context to access filterFlats function
import Flats from "../Fixed_components/Flats"; // Ensure this import is included

export default function Buy() {
  const { filterFlats } = useContext(FlatContext); // Get filterFlats from context
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [filterOpen, setFilterOpen] = useState(false);

  // States for various filters
  const [price, setPrice] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [noOfBedrooms, setNoOfBedrooms] = useState(null);
  const [noOfBathrooms, setNoOfBathrooms] = useState(null);
  // balconi
  const [noOfBalconies, setNoOfBalconies] = useState(null);
  const [schoolDistance, setSchoolDistance] = useState(null);
  const [hospitalDistance, setHospitalDistance] = useState(null);
  const [mainRoadDistance, setMainRoadDistance] = useState(null);
  const [facingDirection, setFacingDirection] = useState(null);
  const [tenantType, setTenantType] = useState(null);
  const [occupancyRequirements, setOccupancyRequirements] = useState(null);
  const [gasConnection, setGasconnection] = useState(null);
  // States for boolean filters
  const [parking, setParking] = useState(null);
  const [furnished, setFurnished] = useState(null);
  const [petFriendly, setPetFriendly] = useState(null);
  const [elevator, setElevator] = useState(null);
  const [generator, setGenerator] = useState(null);
  const [security, setSecurity] = useState(null);
  const [gym, setGym] = useState(null);
  const [pool, setPool] = useState(null);
  const [cctv, setCctv] = useState(null);
  const [roofTopAllowed, setRoofTopAllowed] = useState(null);
  const [loved, setLoved] = useState(null);

  // New state for kitchenType
  const [kitchenType, setKitchenType] = useState(null);

  const filterButtonRef = useRef(null);

  // Handle changes in the search input, update state
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Update search term state
  };

  // Trigger the filter API request
  const handleSearchClick = () => {
    filterFlats({
      location: searchTerm,
      price,
      propertyType,
      noOfBedrooms,
      noOfBathrooms,
      parking,
      furnished,
      petFriendly,
      elevator,
      generator,
      security,
      gym,
      pool,
      schoolDistance,
      hospitalDistance,
      mainRoadDistance,
      facingDirection,
      tenantType,
      loved,
      noOfBalconies, // Assuming this is optional or fixed at 0
      kitchenType, // Add the kitchenType here
      gasConnection, // Assuming this is optional or left as empty
      cctv,
      roofTopAllowed,
      occupancyRequirements,
    });
  };

  // Handle changes for dropdowns
  const handleBooleanChange = (setter) => (value) =>
    setter(value === "none" ? null : value);

  const handleDistanceChange = (setter) => (value) => setter(value);

  const handleOptionChange = (setter) => (value) => setter(value);

  const toggleFilterDropdown = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <>
      {/* Cute search bar for location */}
      <section className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-full rounded-full shadow-lg sm:w-96 md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Location"
                className="w-full py-4 px-6 pl-12 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />

              {/* Search Icon */}

              <FaSearch
                className="absolute p-3 bg-teal-700 rounded-full  right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white hover:text-blue-600 transition duration-300"
                size={45}
                onClick={handleSearchClick}
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" border py-2">
        <div className=" flex flex-col items-center justify-around w-full border">
          {/* Main Filter options shown as dropdowns */}
          <div className="w-[90%] grid grid-cols-9 gap-6 justify-center mb-6">
            {/* Price */}
            <div className="flex flex-col w-full ">
              <label className="font-semibold text-lg mb-2">Price</label>
              <select
                className={`form-select border-2 ${
                  price ? "border-blue-500" : "border-gray-300"
                } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                value={price}
                onChange={(e) => handleOptionChange(setPrice)(e.target.value)}
              >
                <option value={null}>Select Price</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label className="font-semibold text-lg mb-2">Bedrooms</label>
              <select
                className={`form-select border-2 ${
                  noOfBedrooms ? "border-blue-500" : "border-gray-300"
                } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                value={noOfBedrooms}
                onChange={(e) =>
                  handleOptionChange(setNoOfBedrooms)(e.target.value)
                }
              >
                <option value={null}>Select Bedrooms</option>
                <option value="2">2 Bedroom</option>
                <option value="3">3 Bedroom</option>
                <option value="4">4 Bedroom</option>
                <option value="5">5 Bedroom</option>
              </select>
            </div>

            <div className="flex flex-col w-full">
              <label className="font-semibold text-lg mb-2">Bathrooms</label>
              <select
                className={`form-select border-2 ${
                  noOfBathrooms ? "border-blue-500" : "border-gray-300"
                } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                value={noOfBathrooms}
                onChange={(e) =>
                  handleOptionChange(setNoOfBathrooms)(e.target.value)
                }
              >
                <option value={null}>Select Bathrooms</option>
                <option value="2">2 Bathroom</option>
                <option value="3">3 Bathroom</option>
                <option value="4">4 Bathroom</option>
                <option value="5">5 Bathroom</option>
              </select>
            </div>
            {/* balconi */}
            <div className="flex flex-col w-full">
              <label className="font-semibold text-lg mb-2">Balconies</label>
              <select
                className={`form-select border-2 ${
                  noOfBalconies ? "border-blue-500" : "border-gray-300"
                } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                value={noOfBalconies}
                onChange={(e) =>
                  handleOptionChange(setNoOfBalconies)(e.target.value)
                }
              >
                <option value={null}>Select Bathrooms</option>
                <option value="2">2 Balconie</option>
                <option value="3">3 Balconie</option>
                <option value="4">4 Balconie</option>
                <option value="5">5 Balconie</option>
              </select>
            </div>

            {/* Boolean Fields (Yes/No/None) */}
            {[
              { label: "Parking", setter: setParking },

              { label: "Lift", setter: setElevator },
              { label: "Generator", setter: setGenerator },
              { label: "Security", setter: setSecurity },
            ].map(({ label, setter, state }) => (
              <div key={label} className="flex flex-col w-full">
                <label className="font-semibold text-lg mb-2">{label}</label>
                <select
                  className={`form-select border-2 ${
                    state !== null ? "border-teal-700" : "border-gray-300"
                  } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200`}
                  value={state}
                  onChange={(e) => handleBooleanChange(setter)(e.target.value)}
                >
                  <option value={null}>None</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            ))}

            {/* More Filters Button */}
            <div className="flex items-center w-full mt-8 ">
              <button
                className="bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
                onClick={() => setFilterOpen(!filterOpen)} // Toggle the filter visibility
              >
                {filterOpen ? "Less Filters" : "More Filters"}{" "}
                {/* Toggle button text */}
              </button>
            </div>
          </div>

          {/* More filters show after clicking 'More Filters' */}
          {filterOpen && (
            <div className="grid grid-cols-9  w-[90%] gap-6 justify-center mb-6">
              {[
                { label: "School Distance", setter: setSchoolDistance },
                { label: "Hospital Distance", setter: setHospitalDistance },
                { label: "Main Road Distance", setter: setMainRoadDistance },
              ].map(({ label, setter }) => (
                <div key={label} className="flex flex-col w-full ">
                  <label className="font-semibold text-lg mb-2">{label}</label>
                  <select
                    className={`form-select border-2 ${
                      setter ? "border-teal-700" : "border-gray-300"
                    } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 transition duration-200`}
                    value={setter}
                    onChange={(e) => handleOptionChange(setter)(e.target.value)}
                  >
                    <option value={null}>Select Distance</option>
                    <option value="close">Close</option>
                    <option value="medium">Medium</option>
                    <option value="far">Far</option>
                  </select>
                </div>
              ))}
              <div className="flex flex-col w-full">
                <label className="font-semibold text-lg mb-2">
                  Gas Connection
                </label>
                <select
                  className={`form-select border-2 ${
                    gasConnection ? "border-teal-700" : "border-gray-300"
                  } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700 transition duration-200`}
                  value={gasConnection}
                  onChange={(e) =>
                    handleOptionChange(setGasconnection)(e.target.value)
                  }
                >
                  <option value={null}>Gas Type</option>
                  <option value="2">Own Supply</option>
                  <option value="3">Pipe Gas(Natural)</option>
                  <option value="4">No Gas</option>
                </select>
              </div>
              {/* Add missing filters in More Filters: Next 6 options */}
              {[
                { label: "Gym", setter: setGym },
                { label: "Pool", setter: setPool },
                { label: "CCTV", setter: setCctv },
                { label: "Furnished", setter: setFurnished },
                { label: "Pet Friendly", setter: setPetFriendly },
                { label: "Roof Top Allowed", setter: setRoofTopAllowed },

                { label: "Facing Direction", setter: setFacingDirection },
              ].map(({ label, setter, state }) => (
                <div key={label} className="flex flex-col w-full">
                  <label className="font-semibold text-lg mb-2">{label}</label>
                  <select
                    className={`form-select border-2 ${
                      state !== null ? "border-teal-700" : "border-gray-300"
                    } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 transition duration-200`}
                    value={state}
                    onChange={(e) =>
                      handleBooleanChange(setter)(e.target.value)
                    }
                  >
                    <option value={null}>None</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              ))}

              {/* Add distance filters */}
            </div>
          )}
        </div>
      </section>

      {/* Category and Flats Sections */}
      <section className="mt-8">
        <Flats />
      </section>
    </>
  );
}
