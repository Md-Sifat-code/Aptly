import React, { createContext, useState, useEffect, useContext } from "react";

// Create the User Context
const UserContext = createContext();

const UserProviders = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    // Get username from sessionStorage

    if (username) {
      const url = `https://flatelse.onrender.com/User/search/${username}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data); // Set the fetched user data
          setLoading(false); // Set loading to false once the data is loaded
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false); // Set loading to false if there is an error
        });
    } else {
      console.log("No user logged in.");
      setLoading(false); // Set loading to false if no user is logged in
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContexts = () => useContext(UserContext);

export { UserContext, UserProviders, useUserContexts };
