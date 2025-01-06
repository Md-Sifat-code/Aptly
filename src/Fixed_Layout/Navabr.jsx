import React, { useState } from "react";
import logo from "/bariss.png";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../Modals/LoginModal"; // Import LoginModal
import SignupModal from "../Modals/SignupModal"; // Import SignupModal

export default function Navbar() {
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

  const openLoginModal = () => {
    setModalType("login"); // Set modal type to 'login'
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
            className=" p-4 border rounded-full bg-teal-700 font-bold text-white focus:outline-none"
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
                  <Link
                    to="/add-home"
                    className="w-full btn-outline border-[#006d6f] btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                  >
                    Add Home
                  </Link>
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

        {/* Show the modal based on the modalType */}
        {modalType === "login" && <LoginModal closeModal={closeModal} />}
        {modalType === "signup" && (
          <SignupModal
            closeModal={closeModal}
            openLoginModal={openLoginModal}
          />
        )}
      </div>
    </section>
  );
}
