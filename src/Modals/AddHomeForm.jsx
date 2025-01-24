import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
const AddHomeForm = () => {
  const [propertyName, setPropertyName] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [yearBuilt, setYearBuilt] = useState(0);
  const [petFriendly, setPetFriendly] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState("available"); // Changed to dropdown with string values
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
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submits

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submitting multiple times
    if (isSubmitting) return;
    setIsSubmitting(true);

    const updatedParking = parking ? "true" : "false";
    const updatedFurnished = furnished ? "true" : "false";
    const updatedPetFriendly = petFriendly ? "true" : "false";
    const updatedAvailabilityStatus =
      availabilityStatus === "available" ? "true" : "false"; // logic for availability status dropdown
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
        "https://basabari.onrender.com/properties/add",
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
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/"); // Navigate to the homepage after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred while adding the property.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Link to={"/"} className=" bgt font-bold text-2xl">
          <FaRegArrowAltCircleLeft />
        </Link>
        <h2 className="text-3xl pop font-bold text-teal-700 text-center mb-6">
          Add Home for Rent/Sell
        </h2>

        {/* Location, Price and Short Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Short Title
            </label>
            <input
              type="text"
              value={shortTitle}
              onChange={(e) => setShortTitle(e.target.value)}
              placeholder="Enter short title"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Short Description and Long Description */}
        <div className="space-y-4">
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Short Description
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Enter a brief description"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Long Description
            </label>
            <textarea
              value={longDescription}
              onChange={(e) => {
                if (e.target.value.length <= 250) {
                  setLongDescription(e.target.value);
                }
              }}
              placeholder="Detailed description (max 250 characters)"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-sm text-gray-500">
              {longDescription.length}/250 characters
            </p>
          </div>
        </div>

        {/* Property Type, Size, Parking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Property Size (Sq. Ft.)
            </label>
            <input
              type="text"
              value={propertySize}
              onChange={(e) => setPropertySize(e.target.value)}
              placeholder="Enter size"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Year Built
            </label>
            <input
              type="number"
              value={yearBuilt === 0 ? "" : yearBuilt} // Show empty string if yearBuilt is 0
              onChange={(e) =>
                setYearBuilt(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Enter year built"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Furnished, Year Built, Pet Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Furnished
            </label>
            <input
              type="checkbox"
              checked={furnished}
              onChange={(e) => setFurnished(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Parking</label>
            <input
              type="checkbox"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>

          {/* ok */}
          <div className="form-grou flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Pet Friendly
            </label>
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={(e) => setPetFriendly(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
        </div>

        {/* Availability, Owner Name, Owner Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Availability Status
            </label>
            <select
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Owner Name
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Enter owner's name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Owner Contact
            </label>
            <input
              type="text"
              value={ownerContact}
              onChange={(e) => setOwnerContact(e.target.value)}
              placeholder="Enter owner's contact"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="text-sm font-medium text-gray-700">
            Showcase Image
          </label>
          <input
            type="file"
            onChange={(e) => setHeroImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Images and Hero Image */}
        <div className="form-group space-y-4">
          <label className="text-sm font-medium text-gray-700">
            Add Detailed Images (3-4)
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {images.length > 0 &&
              Array.from(images).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    onClick={() => {
                      const newImages = images.filter((_, i) => i !== index);
                      setImages(newImages);
                    }}
                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-center"
          >
            {isSubmitting ? "Adding..." : "Add Property"}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">
              Property Added Successfully!
            </h3>
            <button
              onClick={handleCloseModal}
              className="py-2 px-4 bg-teal-700 text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHomeForm;
