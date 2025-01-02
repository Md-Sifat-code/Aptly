import React, { useState } from "react";

const AddHomeModal = ({ closeModal }) => {
  const [propertyName, setPropertyName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [heroImage, setHeroImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("location", location);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("features", features);
    formData.append("restrictions", restrictions);
    formData.append("heroImage", heroImage);

    try {
      const response = await fetch(
        "https://flatelse.onrender.com/api/properties/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Property added successfully!");
        closeModal();
      } else {
        alert("Failed to add property.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred while adding the property.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 relative">
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
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full p-2 mb-2 border rounded-md"
          />
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
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="file"
            onChange={(e) => setHeroImage(e.target.files[0])}
            className="w-full p-2 mb-4 border rounded-md"
          />
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
