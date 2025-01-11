import React, { useState } from "react";
import { MdDateRange } from "react-icons/md"; // Calendar Icon
import { FaAngleDown } from "react-icons/fa"; // Dropdown Arrow
import Calendar from "react-calendar"; // For the full calendar
import { FaSearch } from "react-icons/fa";
import Category from "../Fixed_components/Category";
import Flats from "../Fixed_components/Flats";

export default function Buy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSide, setSelectedSide] = useState("");
  const [selectedStay, setSelectedStay] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSideDropdown, setShowSideDropdown] = useState(false);
  const [showStayDropdown, setShowStayDropdown] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false); // State to control full menu visibility

  // Track the currently open dropdown
  const [openDropdown, setOpenDropdown] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSideSelect = (side) => {
    setSelectedSide(side);
    setShowSideDropdown(false);
    setOpenDropdown(""); // Close all dropdowns after selection
  };

  const handleStaySelect = (stayType) => {
    setSelectedStay(stayType);
    setShowStayDropdown(false);
    setOpenDropdown(""); // Close all dropdowns after selection
  };

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close the calendar after selection
    setOpenDropdown(""); // Close all dropdowns after selection
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
    setOpenDropdown(openDropdown === "calendar" ? "" : "calendar");
    // Close the other dropdowns if any are open
    if (openDropdown !== "calendar") {
      setShowSideDropdown(false);
      setShowStayDropdown(false);
    }
  };

  const handleSideDropdownToggle = () => {
    setShowSideDropdown(!showSideDropdown);
    setOpenDropdown(openDropdown === "side" ? "" : "side");
    // Close the other dropdowns if any are open
    if (openDropdown !== "side") {
      setShowCalendar(false);
      setShowStayDropdown(false);
    }
  };

  const handleStayDropdownToggle = () => {
    setShowStayDropdown(!showStayDropdown);
    setOpenDropdown(openDropdown === "stay" ? "" : "stay");
    // Close the other dropdowns if any are open
    if (openDropdown !== "stay") {
      setShowCalendar(false);
      setShowSideDropdown(false);
    }
  };

  // Custom styles for the calendar
  const tileClassName = ({ date, view }) => {
    // Color Fridays and Saturdays text red
    if (view === "month") {
      if (date.getDay() === 5 || date.getDay() === 6) {
        return "text-red-400"; // Apply text-red-400 to Fri and Sat
      }
    }
  };

  return (
    <>
      <section className="">
        <div className="container mx-auto mb-2 px-4 md:px-0">
          {/* Search Bar Section */}
          <div className="flex md:hidden justify-center items-center space-x-4 mb-6 gap-4 sm:gap-6 md:gap-8">
            {/* Search Bar (visible for md and below devices) */}
            <div className="relative w-full sm:w-1/2 md:w-1/4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                className="w-full py-4 pl-10 pr-4 text-lg rounded-full border border-[#006d6f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search location"
                onClick={() => setShowFullMenu(true)} // Clicking the search bar triggers the full menu
              />
            </div>
          </div>

          {/* Full-Screen Menu (visible for md and smaller screens when search bar is clicked) */}
          {showFullMenu && (
            <div className="fixed inset-0 bg-white z-50 p-6 shadow-lg overflow-auto">
              <div className="flex flex-col gap-4 lg:gap-0">
                {/* Date Selector */}
                <div className="relative" onClick={handleCalendarToggle}>
                  <div className="py-4 pl-4 pr-4 text-lg border-t border-b border-[#006d6f] cursor-pointer rounded-full">
                    {selectedDate ? selectedDate.toDateString() : "Select date"}
                    <MdDateRange className="inline ml-2 text-gray-500" />
                  </div>
                  {showCalendar && (
                    <div className="absolute top-full mt-2 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] bg-white p-4 shadow-lg rounded-lg z-10">
                      <Calendar
                        onChange={handleCalendarChange} // Use the updated handleCalendarChange function
                        value={selectedDate}
                        className="rounded-lg"
                        tileClassName={tileClassName} // Apply styling for Fri/Sat
                      />
                    </div>
                  )}
                </div>

                {/* Side Dropdown */}
                <div className="relative" onClick={handleSideDropdownToggle}>
                  <div className="py-4 pl-4 pr-4 text-lg text-gray-500 cursor-pointer rounded-full border-t border-b bgr">
                    {selectedSide || "Select side"}
                    <FaAngleDown className="inline ml-2" />
                  </div>
                  {showSideDropdown && (
                    <div className="absolute top-full mt-2 w-full bg-white p-4 shadow-lg rounded-lg z-10">
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
                <div className="relative" onClick={handleStayDropdownToggle}>
                  <div className="py-4 pl-4 pr-4 text-lg text-gray-500 cursor-pointer rounded-full border-t border-b border-[#006d6f]">
                    {selectedStay || "Select type"}
                    <FaAngleDown className="inline ml-2" />
                  </div>
                  {showStayDropdown && (
                    <div className="absolute top-full mt-2 w-full bg-white p-4 shadow-lg rounded-lg z-10">
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

                {/* Close Button */}
                <button
                  className="mt-4 py-2 px-4 text-white bgc font-bold rounded-full"
                  onClick={() => setShowFullMenu(false)}
                >
                  SEARCH
                </button>
              </div>
            </div>
          )}

          {/* For Large Devices */}
          <div className="hidden md:flex justify-center items-center space-x-4 mb-6 gap-4 sm:gap-6 md:gap-8">
            {/* Search Bar Wrapper */}
            <div className="relative flex items-center space-x-2 bgc border border-gray-300 shadow-lg rounded-full px-4 py-2 w-full  max-w-[900px]">
              {/* Location Input */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 pr-4 text-lg rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search location"
                />
              </div>

              {/* Date Selector */}
              <div className="relative">
                <div
                  className="py-2 px-4 text-sm lg:text-lg text-white cursor-pointer rounded-full border-none bgc flex items-center"
                  onClick={handleCalendarToggle}
                >
                  {selectedDate ? selectedDate.toDateString() : "Select date"}
                  <MdDateRange className="ml-2" />
                </div>
                {showCalendar && (
                  <div className="absolute top-full mt-2 w-[500px] bg-white p-4 shadow-lg md:right-1 lg:left-[-180px] rounded-lg z-10">
                    <Calendar
                      onChange={handleCalendarChange} // Use the updated handleCalendarChange function
                      value={selectedDate}
                      className="rounded-lg"
                      tileClassName={tileClassName} // Apply styling for Fri/Sat
                    />
                  </div>
                )}
              </div>

              {/* Side Dropdown */}
              <div className="relative">
                <div
                  className="py-2 px-4 text-sm lg:text-lg text-white cursor-pointer rounded-full bgc flex items-center"
                  onClick={handleSideDropdownToggle}
                >
                  {selectedSide || "Select side"}
                  <FaAngleDown className="ml-2" />
                </div>
                {showSideDropdown && (
                  <div className="absolute top-full mt-2 w-full bg-white p-4 shadow-lg rounded-lg z-10">
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
              <div className="relative">
                <div
                  className="py-2 px-4 text-sm lg:text-lg text-white cursor-pointer rounded-full bgc flex items-center"
                  onClick={handleStayDropdownToggle}
                >
                  {selectedStay || "Select type"}
                  <FaAngleDown className="ml-2" />
                </div>
                {showStayDropdown && (
                  <div className="absolute top-full mt-2 w-full bg-white p-4 shadow-lg rounded-lg z-10">
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
              <div className=" text-black bg-white p-3 rounded-full ">
                <FaSearch className=" cursor-pointer " size={20} />
              </div>
            </div>
          </div>
        </div>
        <hr />
      </section>
      <section>
        <Category />
      </section>
      <section>
        <Flats />
      </section>
    </>
  );
}
