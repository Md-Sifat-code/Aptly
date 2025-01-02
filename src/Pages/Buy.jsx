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
        <div className="flex flex-wrap justify-center items-center space-x-4 mb-6 gap-4 sm:gap-6 md:gap-8">
          {/* Location Input */}
          <div className="relative w-full sm:w-1/2 md:w-1/4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              className="w-full py-4 pl-10 pr-4 text-lg rounded-full border border-[#ff9b0f] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search location"
            />
          </div>

          {/* Date Selector */}
          <div
            className="relative w-full sm:w-1/2 md:w-1/4"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <div className="py-4 pl-4 pr-4 text-lg border-t border-b border-[#ff9b0f] cursor-pointer rounded-full">
              {selectedDate ? selectedDate.toDateString() : "Select date"}
              <MdDateRange className="inline ml-2 text-gray-500" />
            </div>
            {showCalendar && (
              <div className="absolute top-full mt-2 w-full bg-white p-4 shadow-lg rounded-lg">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Side Dropdown */}
          <div
            className="relative w-full sm:w-1/2 md:w-1/4"
            onClick={() => setShowSideDropdown(!showSideDropdown)}
          >
            <div className="py-4 pl-4 pr-4 text-lg text-gray-500 cursor-pointer rounded-full border-t border-b border-[#ff9b0f]">
              {selectedSide || "Select side"}
              <FaAngleDown className="inline ml-2" />
            </div>
            {showSideDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white p-4 shadow-lg rounded-lg">
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
          </div>

          {/* Stay Type Dropdown */}
          <div
            className="relative w-full sm:w-1/2 md:w-1/4"
            onClick={() => setShowStayDropdown(!showStayDropdown)}
          >
            <div className="py-4 pl-4 pr-4 text-lg text-gray-500 cursor-pointer rounded-full border-t border-b border-[#ff9b0f]">
              {selectedStay || "Select type"}
              <FaAngleDown className="inline ml-2" />
            </div>
            {showStayDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white p-4 shadow-lg rounded-lg">
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

          {/* Search Icon */}
        </div>
      </div>
    </section>
  );
}
