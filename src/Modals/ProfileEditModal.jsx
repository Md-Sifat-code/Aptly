import React, { useState } from "react";
import { useUserContexts } from "../Authentication/UserContexts";

export default function ProfileEditModal() {
  const { userData } = useUserContexts();
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control modal visibility
  const [formData, setFormData] = useState({
    fullname: "",
    profession: "",
    bio: "",
    phone: "",
    address: "",
    propertyAdded: 0,
    sold: 0,
    picture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData || !userData.id) {
      alert("User ID not found. Please log in.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.fullname);
    formDataToSend.append("profession", formData.profession);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("propertyAdded", formData.propertyAdded);
    formDataToSend.append("sold", formData.sold);

    if (formData.picture) {
      formDataToSend.append("picture", formData.picture);
    }

    try {
      const response = await fetch(
        `https://flatelse.onrender.com/User/update?id=${userData.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully");
        setIsModalOpen(false); // Close the modal on successful update
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  if (!isModalOpen) {
    return null; // If the modal is closed, render nothing
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl relative">
        {/* Close button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="profession"
                className="block text-sm font-medium text-gray-600"
              >
                Profession
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-600"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="propertyAdded"
                className="block text-sm font-medium text-gray-600"
              >
                Property Added
              </label>
              <input
                type="number"
                id="propertyAdded"
                name="propertyAdded"
                value={formData.propertyAdded}
                onChange={handleInputChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="sold"
                className="block text-sm font-medium text-gray-600"
              >
                Sold
              </label>
              <input
                type="number"
                id="sold"
                name="sold"
                value={formData.sold}
                onChange={handleInputChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-600"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="picture"
              className="block text-sm font-medium text-gray-600"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="picture"
              name="picture"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bgc text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
