import React, { useState } from "react";
import logo from "/bariss.png";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../Modals/LoginModal"; // Keep the LoginModal
import { useUser } from "../Authentication/UserContext";
import { useFetchUserData } from "../Authentication/UserDataContext"; // Import the UserDataContext
import { FiUser } from "react-icons/fi"; // Import React Icon for fallback

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const location = useLocation();

  const { user, logout } = useUser();
  const { userData } = useFetchUserData(); // Access fetchUserData and userData

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActive = (path) =>
    location.pathname === path ? "text-[#006d6f] font-bold" : "";

  return (
    <section className="flex justify-center pop items-center">
      <div className="w-[90%] mt-4 px-4 md:px-0 flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-start items-start">
          <img className="w-[80px] h-auto" src={logo} alt="Logo" />
        </div>

        {/* Middle Links */}
        <div className="hidden lg:flex flex-row gap-12">
          <Link to="/" className={`hover:bgt ${isActive("/")}`}>
            Buy
          </Link>
          <Link to="/sell" className={`hover:bgt ${isActive("/sell")}`}>
            Rent
          </Link>
        </div>

        {/* User Icon */}
        <div className="block relative">
          <button
            onClick={toggleDropdown}
            className="p-[2px] bgc border rounded-full font-bold text-white focus:outline-none"
            aria-label="User menu"
          >
            {userData && userData.profilpic ? (
              <img
                src={userData.profilpic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite error loop
                  e.target.src = "https://via.placeholder.com/40"; // Fallback image URL
                }}
              />
            ) : (
              <FiUser className="text-5xl p-[12px]" /> // React Icon fallback
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 bg-white shadow-lg mt-2 rounded-md w-64 p-6 z-50">
              {!user ? (
                <>
                  <button
                    onClick={() => setModalType("login")}
                    className="w-full bgc hover:bg-teal-700 btn px-4 py-2 text-white"
                  >
                    Login
                  </button>
                  <Link
                    to="/signup"
                    className="w-full btn-outline bgr btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/add-home"
                    className="w-full btn-outline bgr btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                  >
                    Add Home
                  </Link>
                  <Link
                    to={`/profile/${userData?.username}`} // Navigate to user's profile
                    className="w-full btn-outline bgr btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      window.location.reload(); // Reload the page after logout
                    }}
                    className="w-full mt-2 bgc hover:bg-teal-700 btn px-4 py-2 text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Show the LoginModal if the modalType is 'login' */}
      {modalType === "login" && (
        <LoginModal closeModal={() => setModalType(null)} />
      )}
    </section>
  );
}
