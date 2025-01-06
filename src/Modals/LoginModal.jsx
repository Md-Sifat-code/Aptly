import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebook,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa"; // Import new icons

const LoginModal = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Google login
  const handleGoogleLogin = () => {
    console.log("Google Login Logic");
    // Implement Google login logic here
  };

  // Handle Facebook login
  const handleFacebookLogin = () => {
    console.log("Facebook Login Logic");
    // Implement Facebook login logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission logic here
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black"
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
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl mb-4">Login</h2>
          {/* Username Field */}
          <div className="flex items-center mb-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center mb-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center mb-4">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#006d6f] hover:bg-teal-700 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
          >
            <FaGoogle className="mr-2" /> Google
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            <FaFacebook className="mr-2" /> Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
