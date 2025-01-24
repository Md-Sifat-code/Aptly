import React, { createContext, useState, useEffect } from "react";

// Create the context
export const FlatContext = createContext();

// Create the provider component
export const FlatProvider = ({ children }) => {
  const [flats, setFlats] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = () => {
    setLoading(true);
    fetch("https://basabari.onrender.com/properties/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch flat data");
        }
        return response.json();
      })
      .then((data) => {
        // Ensure that the response is an array before setting the state
        setFlats(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Function to filter flats based on selected criteria
  const filterFlats = (filters) => {
    setLoading(true);
    fetch("https://basabari.onrender.com/properties/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters), // Sending filter data in request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch filtered flats");
        }
        return response.json();
      })
      .then((data) => {
        // Ensure that the response is an array before setting the state
        setFlats(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <FlatContext.Provider value={{ flats, loading, error, filterFlats }}>
      {children}
    </FlatContext.Provider>
  );
};
