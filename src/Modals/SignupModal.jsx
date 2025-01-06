import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { FaTimes } from "react-icons/fa";
import qs from "qs"; // For serializing the form data

const SignupModal = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Yup Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/[A-Z]/, "Password must contain an uppercase letter.")
      .matches(/[a-z]/, "Password must contain a lowercase letter.")
      .matches(/[0-9]/, "Password must contain a number.")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain a special character."
      ),
  });

  // Formik hook initialization
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        // Prepare the data as URL-encoded form data using qs
        const formData = qs.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        });

        // Sending the data with application/x-www-form-urlencoded
        const response = await axios.post(
          "https://flatelse.onrender.com/User",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded", // Set Content-Type to form data
            },
          }
        );

        if (
          response.status === 200 ||
          response.data.message === "CoreUser Created"
        ) {
          swal("Success!", "Registration successful!", "success");
          formik.resetForm();
          closeModal();
        } else {
          console.log("Unexpected response:", response);
          alert("Something went wrong while processing your request.");
        }
      } catch (error) {
        console.error("Error during registration:", error);

        // Log more details about the error
        if (error.response) {
          // If the error contains a response from the backend
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          alert(
            `Failed to register. Error: ${
              error.response.data.message || "Unknown error"
            }`
          );
        } else {
          // If there's no response (e.g., network error)
          alert("Failed to register. Please check your inputs and try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Reusable input rendering function
  const renderInput = (label, name, type = "text", placeholder) => (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text font-bold">{label}</span>
      </label>
      <input
        type={type} // Set the type to text for password
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full p-2"
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm mt-2">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Formik Form */}
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-xl mb-4">Sign Up</h2>
          {/* Render the inputs using renderInput */}
          {renderInput("Full Name", "username", "text", "Full Name")}
          {renderInput("Email", "email", "email", "Email")}
          {renderInput("Password", "password", "text", "Password")}{" "}
          {/* Set the password field type to "password" for better security */}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#006d6f] hover:bg-teal-700 text-white py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Display Error Message */}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default SignupModal;
