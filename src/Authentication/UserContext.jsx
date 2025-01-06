// // src/Authentication/UserContext.jsx
// import React, { createContext, useState, useContext } from "react"; // Combine imports here
// import axios from "axios"; // Axios is imported directly here

// // Define the context
// const UserContext = createContext();

// // UserProvider will be used to wrap your components
// const UserProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // signupUser function handles the API request
//   const signupUser = async (userData) => {
//     try {
//       setLoading(true);
//       setError(null); // Reset error before making a request
//       const response = await axios.post(
//         "https://flatelse.onrender.com/User",
//         userData
//       );
//       console.log("User successfully signed up:", response.data);
//       // Here you can handle successful signup (store user data, redirect, etc.)
//     } catch (err) {
//       console.error("Error signing up:", err);
//       setError(err.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ signupUser, loading, error }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use context easily
// const useUserContext = () => {
//   return useContext(UserContext);
// };

// export { UserProvider, useUserContext };
