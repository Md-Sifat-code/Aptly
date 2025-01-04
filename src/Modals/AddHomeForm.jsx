import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddHomeForm = () => {
  const [propertyName, setPropertyName] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [yearBuilt, setYearBuilt] = useState(0);
  const [petFriendly, setPetFriendly] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [heroImage, setHeroImage] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedParking = parking ? "true" : "false";
    const updatedFurnished = furnished ? "true" : "false";
    const updatedPetFriendly = petFriendly ? "true" : "false";
    const updatedAvailabilityStatus = availabilityStatus || "";
    const updatedPropertyType = propertyType || "";
    const updatedPropertySize = propertySize || "";
    const updatedYearBuilt = yearBuilt || 0;
    const updatedOwnerName = ownerName || "";
    const updatedOwnerContact = ownerContact || "";

    const formData = new FormData();
    formData.append("location", location);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("features", features);
    formData.append("restrictions", restrictions);
    formData.append("heroImage", heroImage);
    formData.append("shortTitle", shortTitle);
    formData.append("propertyType", updatedPropertyType);
    formData.append("propertySize", updatedPropertySize);
    formData.append("parking", updatedParking);
    formData.append("furnished", updatedFurnished);
    formData.append("yearBuilt", updatedYearBuilt);
    formData.append("petFriendly", updatedPetFriendly);
    formData.append("availabilityStatus", updatedAvailabilityStatus);
    formData.append("ownerName", updatedOwnerName);
    formData.append("ownerContact", updatedOwnerContact);

    images.forEach((image) => {
      formData.append("imageUrls", image);
    });

    try {
      const response = await fetch(
        "https://flatelse.onrender.com/properties/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        alert("Failed to add property.");
      } else {
        setShowModal(true); // Show the modal after successful submission
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred while adding the property.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[900px] mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Home for Rent/Sell
        </h2>

        {/* Location, Price and Short Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="form-group">
            <label className="text-sm font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium">Short Title</label>
            <input
              type="text"
              value={shortTitle}
              onChange={(e) => setShortTitle(e.target.value)}
              placeholder="Short Title"
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Short Description and Long Description */}
        <div className="form-group mb-4">
          <label className="text-sm font-medium">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Short Description"
            className="w-full p-2 border rounded-md shadow-sm"
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-sm font-medium">Long Description</label>
          <textarea
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder="Long Description"
            className="w-full p-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Property Type, Size, Parking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="form-group">
            <label className="text-sm font-medium">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm font-medium">
              Property Size(Squire Fit)
            </label>
            <input
              type="text"
              value={propertySize}
              onChange={(e) => setPropertySize(e.target.value)}
              placeholder="Property Size"
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium">Parking</label>
            <select
              value={parking}
              onChange={(e) => setParking(e.target.value === "Yes")}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">Parking</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Furnished, Year Built, Pet Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="form-group">
            <label className="text-sm font-medium">Furnished</label>
            <select
              value={furnished}
              onChange={(e) => setFurnished(e.target.value === "Yes")}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">Furnished</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm font-medium">
              Year Built(Write year)
            </label>
            <input
              type="number"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(Number(e.target.value))}
              placeholder="Year Built"
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium">Pet Friendly</label>
            <select
              value={petFriendly}
              onChange={(e) => setPetFriendly(e.target.value === "Yes")}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">Pet Friendly</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Availability, Owner Name, Owner Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="form-group">
            <label className="text-sm font-medium">Availability Status</label>
            <input
              type="text"
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              placeholder="Available/Not Available/Booked"
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium">Owner Name</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Owner Name"
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium">Owner Contact</label>
            <input
              type="text"
              value={ownerContact}
              onChange={(e) => setOwnerContact(e.target.value)}
              placeholder="Owner Contact"
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Images and Hero Image */}
        <div className="form-group mb-4">
          <label className="text-sm font-medium">
            Detailed Images Add 3-4 just clicking one by one
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md shadow-sm"
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-sm font-medium">Showcase Image</label>
          <input
            type="file"
            onChange={(e) => setHeroImage(e.target.files[0])}
            className="w-full p-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-700"
          >
            Add Property <FaUpload className="inline ml-2" />
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] sm:w-[400px]">
            <h3 className="text-xl font-semibold text-center mb-4">
              Property Added!
            </h3>
            <p className="text-center text-sm mb-4">
              Your property has been successfully added.
            </p>
            <div className="text-center">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHomeForm;
