import React, { useState } from "react";
import logo from "/baris.png";
import { Link, useLocation } from "react-router-dom";

export default function Navabr() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to check if the link is active
  const isActive = (path) =>
    location.pathname === path ? "text-[#ff9b0f] font-bold" : "";

  return (
    <section className="flex justify-center pop items-center">
      <div className="container mt-4 px-4 md:px-0 flex justify-between items-center">
        {/* Logo part */}
        <div className="flex justify-start items-start">
          <img className="w-[150px] h-auto" src={logo} alt="" />
        </div>

        {/* Middle Links */}
        <div className="hidden lg:flex flex-row gap-12">
          <Link to="/" className={`hover:text-[#ff9b0f] ${isActive("/")}`}>
            Buy
          </Link>
          <Link
            to="/sell"
            className={`hover:text-yellow-500 ${isActive("/sell")}`}
          >
            Rent
          </Link>
        </div>

        {/* Last Section */}
        <div className="hidden lg:block">
          <Link className="btn btn-primary px-12 bg-[#ff9b0f] text-white font-bold border-none rounded-none">
            Login
          </Link>
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
              Sell
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="btn btn-primary px-12 bg-[#ff9b0f] text-white font-bold border-none rounded-none"
            >
              Login
            </Link>
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
