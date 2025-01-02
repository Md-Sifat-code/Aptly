import React, { useState } from "react";
import logo from "/bariss.png";
import { Link, useLocation } from "react-router-dom";

export default function Navabr() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown menu
  const location = useLocation();

  // Example state for user authentication status (can be replaced with actual auth logic)
  const user = null; // Replace with actual user object when logged in

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Helper function to check if the link is active
  const isActive = (path) =>
    location.pathname === path ? "text-[#006d6f] font-bold" : "";

  return (
    <section className="flex justify-center pop items-center">
      <div className="container mt-4 px-4 md:px-0 flex justify-between items-center">
        {/* Logo part */}
        <div className="flex justify-start items-start">
          <img className="w-[150px] h-auto" src={logo} alt="" />
        </div>

        {/* Middle Links */}
        <div className="hidden lg:flex flex-row gap-12">
          <Link to="/" className={`hover:text-[#006d6f] ${isActive("/")}`}>
            Buy
          </Link>
          <Link
            to="/sell"
            className={`hover:text-teal-700 ${isActive("/sell")}`}
          >
            Rent
          </Link>
        </div>

        {/* Normal User Icon (visible only on large screens) */}
        <div className="hidden lg:block relative">
          <button
            onClick={toggleDropdown}
            className="lg:block text-black focus:outline-none"
            aria-label="User menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c0 1.1-.9 2-2 2H8c-1.1 0-2 .9-2 2s.9 2 2 2h8c1.1 0 2-.9 2-2s-.9-2-2-2h-2c-1.1 0-2-.9-2-2z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 bg-white shadow-lg mt-2 rounded-md w-64 p-6  z-50">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full bg-[#006d6f] hover:bg-teal-700  btn  px-4 py-2 text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full btn-outline border-[#006d6f]  btn hover:bg-teal-700 mt-2  px-4 py-2 text-black"
                  >
                    Signup
                  </Link>
                  <Link
                    to="/add-home"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full btn-outline border-[#006d6f]  btn hover:bg-teal-700 mt-2  px-4 py-2 text-black"
                  >
                    Add Rent/Sell
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/home"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-black"
                  >
                    Your Home
                  </Link>
                  <Link
                    to="/add-home"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-black"
                  >
                    Add Home for Rent/Sell
                  </Link>
                  <Link
                    to="/help-center"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-black"
                  >
                    Help Center
                  </Link>
                  <Link
                    to="/logout"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-black"
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <div className="flex flex-col items-center justify-center gap-8 py-8">
            <Link
              to={"/"}
              onClick={() => setIsOpen(false)}
              className={`text-xl font-bold text-black ${isActive("/")}`}
            >
              Buy
            </Link>
            <Link
              to={"/sell"}
              onClick={() => setIsOpen(false)}
              className={`text-xl font-bold text-black ${isActive("/sell")}`}
            >
              Rent
            </Link>

            {/* User Icon in Mobile Menu */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-black focus:outline-none"
                aria-label="User menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c0 1.1-.9 2-2 2H8c-1.1 0-2 .9-2 2s.9 2 2 2h8c1.1 0 2-.9 2-2s-.9-2-2-2h-2c-1.1 0-2-.9-2-2z"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 bg-white shadow-lg mt-2 rounded-md w-48 z-50">
                  {!user ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-black"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-black"
                      >
                        Signup
                      </Link>
                      <Link
                        to="/add-home"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-black"
                      >
                        Add Home for Rent/Sell
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/home"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-black"
                      >
                        Your Home
                      </Link>
                      <Link
                        to="/add-home"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-black"
                      >
                        Add Home for Rent/Sell
                      </Link>
                      <Link
                        to="/help-center"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-black"
                      >
                        Help Center
                      </Link>
                      <Link
                        to="/logout"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-black"
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-black focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
