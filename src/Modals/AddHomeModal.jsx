import React, { useState } from "react";

const AddHomeModal = ({ closeModal }) => {
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

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensuring default values for optional fields
    const updatedParking =
      parking === null ? "false" : parking ? "true" : "false";
    const updatedFurnished =
      furnished === null ? "false" : furnished ? "true" : "false";
    const updatedPetFriendly =
      petFriendly === null ? "false" : petFriendly ? "true" : "false";
    const updatedAvailabilityStatus = availabilityStatus || "";
    const updatedPropertyType = propertyType || "";
    const updatedPropertySize = propertySize || "";
    const updatedYearBuilt = yearBuilt || 0; // default to 0 if yearBuilt is not set
    const updatedOwnerName = ownerName || "";
    const updatedOwnerContact = ownerContact || "";

    const formData = new FormData();
    formData.append("location", location);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("features", features);
    formData.append("restrictions", restrictions);
    formData.append("heroImage", heroImage); // Hero image file
    formData.append("shortTitle", shortTitle);
    formData.append("propertyType", updatedPropertyType);
    formData.append("propertySize", updatedPropertySize);
    formData.append("parking", updatedParking); // Boolean value as string
    formData.append("furnished", updatedFurnished); // Boolean value as string
    formData.append("yearBuilt", updatedYearBuilt);
    formData.append("petFriendly", updatedPetFriendly); // Boolean value as string
    formData.append("availabilityStatus", updatedAvailabilityStatus);
    formData.append("ownerName", updatedOwnerName);
    formData.append("ownerContact", updatedOwnerContact);

    images.forEach((image) => {
      formData.append("imageUrls", image); // Adding additional images
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
        alert("Property added successfully!");
        closeModal();
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred while adding the property.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[900px] relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl mb-4">Add Home for Rent/Sell</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              value={shortTitle}
              onChange={(e) => setShortTitle(e.target.value)}
              placeholder="Short Title"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Short Description"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <textarea
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder="Long Description"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <div className="grid grid-cols-3 gap-4 mb-4">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
            </select>
            <input
              type="text"
              value={propertySize}
              onChange={(e) => setPropertySize(e.target.value)}
              placeholder="Property Size"
              className="w-full p-2 border rounded-md"
            />
            <select
              value={parking}
              onChange={(e) => setParking(e.target.value === "Yes")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Parking</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <select
              value={furnished}
              onChange={(e) => setFurnished(e.target.value === "Yes")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Furnished</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input
              type="number"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(Number(e.target.value))}
              placeholder="Year Built"
              className="w-full p-2 border rounded-md"
            />
            <select
              value={petFriendly}
              onChange={(e) => setPetFriendly(e.target.value === "Yes")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Pet Friendly</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <select
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Availability Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
              <option value="Booked">Booked</option>
            </select>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Owner Name"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              value={ownerContact}
              onChange={(e) => setOwnerContact(e.target.value)}
              placeholder="Owner Contact"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2">Showcase Picture</label>
            <input
              type="file"
              onChange={(e) => setHeroImage(e.target.files[0])}
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>

          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Features"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            placeholder="Restrictions"
            className="w-full p-2 mb-4 border rounded-md"
          />
          <div className="mb-4">
            <label className="block mb-2">Upload Details Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#006d6f] hover:bg-teal-700 text-white py-2 rounded-md"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHomeModal;
