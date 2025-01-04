import React, { createContext, useState, useEffect } from "react";

// Create the context
export const FlatContext = createContext();

// Create the provider component
export const FlatProvider = ({ children }) => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the external API
    fetch("https://flatelse.onrender.com/properties/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch flat data");
        }
        return response.json();
      })
      .then((data) => {
        setFlats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <FlatContext.Provider value={{ flats, loading, error }}>
      {children}
    </FlatContext.Provider>
  );
};
