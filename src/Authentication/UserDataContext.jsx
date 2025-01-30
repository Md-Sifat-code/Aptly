import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext"; // Import useUser if the username is stored there

// Create a new context
const UserDataContext = createContext();

// Custom hook to use the context
export const useFetchUserData = () => {
  return useContext(UserDataContext);
};

// Context provider component
export const UserDataProvider = ({ children }) => {
  const { user } = useUser(); // Assume `user` contains the logged-in user's information
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(false); // State to handle loading

  // Function to fetch user data
  const fetchUserData = async (username) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://baribazar-489l.onrender.com/User/search/${username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data); // Store the fetched user data in state
      console.log("Fetched user data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null); // Reset user data on error
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch user data on mount or when the user changes
  useEffect(() => {
    if (user && user.username) {
      fetchUserData(user.username); // Call fetchUserData with the user's username
    }
  }, [user]); // Dependency array ensures it re-fetches if the user changes

  return (
    <UserDataContext.Provider value={{ userData, fetchUserData, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};
