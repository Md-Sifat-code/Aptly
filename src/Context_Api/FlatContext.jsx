import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
export const FlatContext = createContext();

// Custom hook to access context easily
export const useFlatContext = () => {
  return useContext(FlatContext);
};

// Create the provider component
export const FlatProvider = ({ children }) => {
  const [flats, setFlats] = useState([]); // Flats data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dealType, setDealType] = useState("buy"); // Track the current dealType

  // Fetch flats based on dealType
  const fetchFlats = (dealType) => {
    setLoading(true);
    fetch(`https://baribazar-489l.onrender.com/properties/getAll/${dealType}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch flat data");
        }
        return response.json();
      })
      .then((data) => {
        setFlats(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Fetch flats whenever the dealType changes
  useEffect(() => {
    fetchFlats(dealType);
  }, [dealType]); // Dependency on dealType

  // Function to filter flats based on selected criteria (POST request)
  const filterFlats = (filters) => {
    setLoading(true);
    fetch("https://baribazar-489l.onrender.com/properties/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch filtered flats");
        }
        return response.json();
      })
      .then((data) => {
        // Update the flats state with the response data
        setFlats(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <FlatContext.Provider
      value={{ flats, loading, error, setDealType, filterFlats }}
    >
      {children}
    </FlatContext.Provider>
  );
};
