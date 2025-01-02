import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDateRange } from "react-icons/md"; // Calendar Icon
import { FaAngleDown } from "react-icons/fa"; // Dropdown Arrow
import Calendar from "react-calendar"; // For the full calendar

export default function Buy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSide, setSelectedSide] = useState("");
  const [selectedStay, setSelectedStay] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSideDropdown, setShowSideDropdown] = useState(false);
  const [showStayDropdown, setShowStayDropdown] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSideSelect = (side) => {
    setSelectedSide(side);
    setShowSideDropdown(false);
  };

  const handleStaySelect = (stayType) => {
    setSelectedStay(stayType);
    setShowStayDropdown(false);
  };

  return (
    <section className="py-10">
      <div className="container mx-auto">
        {/* Search Bar Section */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <div className="relative w-full  bg-white rounded-full shadow-lg flex items-center p-1">
            {/* Location Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              className="w-1/4 py-4 pl-10 pr-4 text-lg rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search location"
            />
            {/* Date Selector */}
            <div
              className="w-1/4 py-4 pl-4 pr-4 text-lg border-t border-b border-gray-300 cursor-pointer"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {selectedDate ? selectedDate.toDateString() : "Select date"}
              <MdDateRange className="inline ml-2 text-gray-500" />
            </div>
            {/* Side Dropdown */}
            <div
              className="w-1/4 py-4 text-lg text-gray-500 cursor-pointer"
              onClick={() => setShowSideDropdown(!showSideDropdown)}
            >
              {selectedSide || "Select side"}
              <FaAngleDown className="inline ml-2" />
            </div>
            {/* Stay Type Dropdown */}
            <div
              className="w-1/4 py-4 text-lg text-gray-500 cursor-pointer"
              onClick={() => setShowStayDropdown(!showStayDropdown)}
            >
              {selectedStay || "Select type"}
              <FaAngleDown className="inline ml-2" />
            </div>
            <FaSearch className="absolute right-4 text-gray-500" />
          </div>
        </div>

        {/* Full Calendar */}
        {showCalendar && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-lg rounded-lg w-96">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded-lg"
            />
          </div>
        )}

        {/* Side Dropdown */}
        {showSideDropdown && (
          <div className="absolute top-32 left-1/4 transform -translate-x-1/2 bg-white p-4 shadow-lg rounded-lg w-1/4">
            <h3 className="text-lg font-semibold">Select Side</h3>
            <ul>
              <li
                className="cursor-pointer py-2 hover:bg-gray-200"
                onClick={() => handleSideSelect("South")}
              >
                South
              </li>
              <li
                className="cursor-pointer py-2 hover:bg-gray-200"
                onClick={() => handleSideSelect("North")}
              >
                North
              </li>
              <li
                className="cursor-pointer py-2 hover:bg-gray-200"
                onClick={() => handleSideSelect("East")}
              >
                East
              </li>
              <li
                className="cursor-pointer py-2 hover:bg-gray-200"
                onClick={() => handleSideSelect("West")}
              >
                West
              </li>
            </ul>
          </div>
        )}

        {/* Stay Type Dropdown */}
        {showStayDropdown && (
          <div className="absolute top-32 left-3/4 transform -translate-x-1/2 bg-white p-4 shadow-lg rounded-lg w-1/4">
            <h3 className="text-lg font-semibold">Select Stay Type</h3>
            <ul>
              <li
                className="cursor-pointer py-2 hover:bg-gray-200"
                onClick={() => handleStaySelect("For Family")}
              >
                For Family
              </li>
              <li
                className="cursor-pointer py-2 hover:bg-gray-200"
                onClick={() => handleStaySelect("For Bachelor")}
              >
                For Bachelor
              </li>
              <li
                className="cursor-pointer py-2 hover:bg-gray-200"
                onClick={() => handleStaySelect("For Married")}
              >
                For Married
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
