// LoginModal.js
import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaUser, FaLock } from "react-icons/fa"; // Import new icons
import { useUser } from "../Authentication/UserContext"; // Import useUser hook
import { useFetchUserData } from "../Authentication/UserDataContext"; // Import new context API for GET request

const LoginModal = ({ closeModal }) => {
  const { updateUser } = useUser(); // Access updateUser from context
  const { fetchUserData } = useFetchUserData(); // Access fetchUserData from the new context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // State for tracking login success

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send in the POST request
    const loginData = { username, password };

    try {
      // Send the POST request to the backend
      const response = await fetch("https://baribazar.onrender.com/Log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      // Parse the response data
      const data = await response.json();

      // Update user context with the response data
      updateUser({
        token: data.token,
        username: data.username,
        email: data.email,
        roles: data.roles,
      });

      // Fetch additional user data using the new context API
      await fetchUserData(data.username);

      // Set loginSuccess to true to show success modal
      setLoginSuccess(true);

      // Optional: close the login modal after success
      setTimeout(() => {
        closeModal();
      }, 2000); // Delay closing the login modal for 2 seconds (or adjust as needed)
    } catch (error) {
      setErrorMessage(error.message); // Show the error message if login fails
    }
  };

  // Success Modal to display after login
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-green-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl text-green-500 mb-4">Login Successful!</h2>
        <p>Welcome, {username}! You have successfully logged in.</p>
        <button
          onClick={closeModal}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      {loginSuccess && <SuccessModal />}{" "}
      {/* Show success modal after successful login */}
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

            {/* Password Field */}
            <div className="flex items-center mb-4">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="text" // Changed password type to text
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Error message (if any) */}
            {errorMessage && (
              <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
            )}

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
    </>
  );
};

export default LoginModal;
