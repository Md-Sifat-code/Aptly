import React, { useState } from "react";
import logo from "/bariss.png";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../Modals/LoginModal"; // Import LoginModal
import SignupModal from "../Modals/SignupModal"; // Import SignupModal
import AddHomeModal from "../Modals/AddHomeModal"; // Import AddHomeModal

export default function Navabr() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown menu
  const [modalType, setModalType] = useState(null); // Track which modal to show
  const location = useLocation();

  const user = null; // Example user state, replace with actual auth logic

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const showModal = (type) => {
    setModalType(type); // Set modal type based on button click
    setIsDropdownOpen(false); // Close dropdown when a modal is triggered
  };

  const closeModal = () => {
    setModalType(null); // Close the modal
  };

  const isActive = (path) =>
    location.pathname === path ? "text-[#006d6f] font-bold" : "";

  return (
    <section className="flex justify-center pop items-center">
      <div className="container mt-4 px-4 md:px-0 flex justify-between items-center">
        {/* Logo */}
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

        {/* User Icon */}
        <div className="hidden lg:block relative">
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
            <div className="absolute right-0 bg-white shadow-lg mt-2 rounded-md w-64 p-6 z-50">
              {!user ? (
                <>
                  <button
                    onClick={() => showModal("login")}
                    className="w-full bg-[#006d6f] hover:bg-teal-700 btn px-4 py-2 text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => showModal("signup")}
                    className="w-full btn-outline border-[#006d6f] btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                  >
                    Signup
                  </button>
                  <button
                    onClick={() => showModal("add-home")}
                    className="w-full btn-outline border-[#006d6f] btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                  >
                    Add Home
                  </button>
                </>
              ) : (
                <Link
                  to="/profile"
                  className="w-full text-black hover:text-[#006d6f] py-2"
                >
                  Profile
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex flex-col gap-6">
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-lg mt-12 p-6 z-50 overflow-auto">
              <div className="flex justify-end">
                <button
                  onClick={toggleMenu}
                  className="text-black focus:outline-none"
                  aria-label="Close menu"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <Link to="/" className="text-black hover:text-[#006d6f] py-2">
                  Buy
                </Link>
                <Link
                  to="/sell"
                  className="text-black hover:text-[#006d6f] py-2"
                >
                  Rent
                </Link>
                {/* User Icon for Mobile */}
                <button
                  onClick={toggleDropdown}
                  className="flex justify-center items-center w-full text-black hover:text-[#006d6f] py-2"
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
                {isDropdownOpen && (
                  <div className="flex flex-col w-full gap-2 mt-2">
                    {!user ? (
                      <>
                        <button
                          onClick={() => showModal("login")}
                          className="w-full bg-[#006d6f] hover:bg-teal-700 btn px-4 py-2 text-white"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => showModal("signup")}
                          className="w-full btn-outline border-[#006d6f] btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                        >
                          Signup
                        </button>
                        <button
                          onClick={() => showModal("add-home")}
                          className="w-full btn-outline border-[#006d6f] btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                        >
                          Add Home
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/profile"
                        className="w-full text-black hover:text-[#006d6f] py-2"
                      >
                        Profile
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Show the modal based on the modalType */}
      {modalType === "login" && <LoginModal closeModal={closeModal} />}
      {modalType === "signup" && <SignupModal closeModal={closeModal} />}
      {modalType === "add-home" && <AddHomeModal closeModal={closeModal} />}
    </section>
  );
}
