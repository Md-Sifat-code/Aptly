import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create a custom hook to access the user context
export const useUser = () => {
  return useContext(UserContext);
};

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for existing session token on app load
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // Token exists, you can decode or fetch user details here if needed
      const username = sessionStorage.getItem("username");
      const email = sessionStorage.getItem("email");
      const roles = sessionStorage.getItem("roles")?.split(",") || [];

      setUser({
        username,
        email,
        roles,
        token,
      });
    }
  }, []);

  // Function to update user data in the context
  const updateUser = (userData) => {
    setUser(userData);

    // Save user data in sessionStorage
    sessionStorage.setItem("token", userData.token);
    sessionStorage.setItem("username", userData.username);
    sessionStorage.setItem("email", userData.email);
    sessionStorage.setItem("roles", userData.roles.join(","));
  };

  // Function to clear user data and log out
  const logout = () => {
    setUser(null);
    sessionStorage.clear(); // Clear session storage
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
