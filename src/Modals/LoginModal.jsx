// LoginModal.js
import React, { useState, useEffect, useRef } from "react";
import { FaGoogle, FaFacebook, FaUser, FaLock } from "react-icons/fa"; // Import new icons
import { useUser } from "../Authentication/UserContext"; // Import useUser hook
import { useFetchUserData } from "../Authentication/UserDataContext"; // Import new context API for GET request

const LoginModal = ({ closeModal }) => {
  const { updateUser } = useUser(); // Access updateUser from context
  const { fetchUserData } = useFetchUserData(); // Access fetchUserData from the new context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for tracking loading
  const [loginSuccess, setLoginSuccess] = useState(false); // State for tracking login success

  // Create a ref for the modal container to detect clicks outside
  const modalRef = useRef(null);

  // Close the modal if the user clicks outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal(); // Close the modal if clicked outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

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
    setIsLoading(true); // Set loading to true while fetching data

    // Prepare the data to send in the POST request
    const loginData = { username, password };

    try {
      // Send the POST request to the backend
      const response = await fetch("https://basabari.onrender.com/Log", {
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

      // Set loginSuccess to true to show success message
      setLoginSuccess(true);

      // Close modal after successful login
      setTimeout(() => {
        closeModal();
      }, 1500); // Close the modal after a slight delay for better UX
    } catch (error) {
      setErrorMessage(error.message); // Show the error message if login fails
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef} // Attach the ref here
        className="bg-white p-6 rounded-md w-96"
      >
        {isLoading ? (
          // Show loading spinner while the request is being processed
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-[#006d6f] w-16 h-16"></div>
          </div>
        ) : (
          // Show the login form when not loading
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
                type="text" // Keeping the password input type as text as per your request
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
        )}
      </div>
    </div>
  );
};

export default LoginModal;
