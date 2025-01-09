import React, { useState } from "react";
import logo from "/bariss.png";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../Modals/LoginModal";
import SignupModal from "../Modals/SignupModal";
import { useUser } from "../Authentication/UserContext";
import ProfileDrawer from "../Modals/ProfileDrawer";
import { useFetchUserData } from "../Authentication/UserDataContext"; // Import the UserDataContext
import { FiUser } from "react-icons/fi"; // Import React Icon for fallback

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const location = useLocation();

  const { user, logout } = useUser();
  const { userData } = useFetchUserData(); // Access fetchUserData and userData

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const showModal = (type) => {
    setModalType(type);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const openLoginModal = () => {
    setModalType("login");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-[#006d6f] font-bold" : "";

  const closeProfileDrawer = () => {
    setIsProfileDrawerOpen(false);
  };

  return (
    <section className="flex justify-center pop items-center">
      <div className="container mt-4 px-4 md:px-0 flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-start items-start">
          <img className="w-[80px] h-auto" src={logo} alt="Logo" />
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
        <div className="block relative">
          <button
            onClick={toggleDropdown}
            className="p-4 border rounded-full bg-teal-700 font-bold text-white focus:outline-none"
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
              <FiUser className="w-10 h-10" /> // React Icon fallback
            )}
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
                </>
              ) : (
                <>
                  <Link
                    to="/add-home"
                    className="w-full btn-outline border-[#006d6f] btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                  >
                    Add Home
                  </Link>
                  <button
                    onClick={() => setIsProfileDrawerOpen(true)}
                    className="w-full btn-outline border-[#006d6f] btn hover:bg-teal-700 mt-2 px-4 py-2 text-black"
                  >
                    Profile
                  </button>
                  <button
                    onClick={logout}
                    className="w-full mt-2 bg-[#006d6f] hover:bg-teal-700 btn px-4 py-2 text-white"
                  >
                    Logout
                  </button>
                </>
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

        {/* Profile Drawer */}
        {isProfileDrawerOpen && (
          <ProfileDrawer closeDrawer={closeProfileDrawer} />
        )}
      </div>
    </section>
  );
}
