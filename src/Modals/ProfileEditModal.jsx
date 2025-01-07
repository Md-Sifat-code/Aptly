import React, { useState } from "react";

export default function ProfileEditModal() {
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

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle picture file change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        "https://flatelse.onrender.com/User/update",
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="propertyAdded">Property Added</label>
          <input
            type="number"
            id="propertyAdded"
            name="propertyAdded"
            value={formData.propertyAdded}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="sold">Sold</label>
          <input
            type="number"
            id="sold"
            name="sold"
            value={formData.sold}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="picture">Profile Picture</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button className="btn" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}
