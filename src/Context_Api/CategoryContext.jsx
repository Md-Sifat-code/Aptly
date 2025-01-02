import React, { createContext, useState, useEffect } from "react";

// Create the Context
export const CategoryContext = createContext();

// Create the Provider Component
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the categories dynamically from the public folder
    const fetchCategories = async () => {
      try {
        const response = await fetch("/Category.json"); // Fetch from public/Category.json
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
