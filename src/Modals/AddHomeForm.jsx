import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const AddHomeForm = () => {
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const [propertyName, setPropertyName] = useState("");

  const [propertyType, setPropertyType] = useState("");
  // extra
  const [schoolDistance, setschoolDistance] = useState("");
  const [hospitalDistance, sethospitalDistance] = useState("");
  const [mainRoadDistance, setmainRoadDistance] = useState("");
  //
  const [propertySize, setPropertySize] = useState("");
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [yearBuilt, setYearBuilt] = useState(0);
  // more extras
  const [noOfBedrooms, setnoOfBedrooms] = useState(0);
  const [noOfBathrooms, setnoOfBathrooms] = useState(0);
  const [floorLevel, setfloorLevel] = useState(0);
  const [noOfBalconies, setnoOfBalconies] = useState(0);
  // end
  const [petFriendly, setPetFriendly] = useState(false);
  const [elevator, setElevator] = useState(false);
  const [generator, setGenerator] = useState(false);
  const [security, setSecurity] = useState(false);
  const [gym, setGym] = useState(false);
  const [pool, setPool] = useState(false);
  const [cctv, setCctv] = useState(false);
  const [roofTopAllowed, setRoofTopAllowed] = useState(false);
  const [username, setUsername] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available"); // Changed to dropdown with string values
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [features, setFeatures] = useState(""); // New state for features
  const [restrictions, setRestrictions] = useState(""); // New state for restrictions
  const [dealType, setDealType] = useState("Buy"); // Default to "Buy"
  // New state for dealType
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
    // extras
    const updatedschoolDistance = schoolDistance || "";
    const updatedhospitalDistance = hospitalDistance || "";
    const updatedmainRoadDistance = mainRoadDistance || "";

    //
    const updatedPropertySize = propertySize || "";
    const updatedYearBuilt = yearBuilt || 0;
    // more extra
    const updatednoOfBedrooms = noOfBedrooms || 0;
    const updatednoOfBathrooms = noOfBathrooms || 0;
    const updatedfloorLevel = floorLevel || 0;
    const updatednoOfBalconies = noOfBalconies || 0;
    // end
    const updatedOwnerName = ownerName || "";
    const updatedOwnerContact = ownerContact || "";
    const updatedFeatures = features || ""; // New data
    const updatedRestrictions = restrictions || ""; // New data
    const updatedDealType = dealType || ""; // New data
    const updatedElevator = elevator ? "true" : "false";
    const updatedGenerator = generator ? "true" : "false";
    const updatedSecurity = security ? "true" : "false";
    const updatedGym = gym ? "true" : "false";
    const updatedPool = pool ? "true" : "false";
    const updatedCctv = cctv ? "true" : "false";
    const updatedRoofTopAllowed = roofTopAllowed ? "true" : "false";

    const formData = new FormData();
    formData.append("location", location);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("features", updatedFeatures); // Add features to formData
    formData.append("restrictions", updatedRestrictions); // Add restrictions to formData
    formData.append("dealType", updatedDealType); // Add dealType to formData
    formData.append("heroImage", heroImage);

    formData.append("propertyType", updatedPropertyType);
    // extra
    formData.append("schoolDistance", updatedschoolDistance);
    formData.append("hospitalDistance", updatedhospitalDistance);
    formData.append("mainRoadDistance", updatedmainRoadDistance);

    //
    formData.append("propertySize", updatedPropertySize);
    formData.append("parking", updatedParking);
    formData.append("furnished", updatedFurnished);
    formData.append("yearBuilt", updatedYearBuilt);
    // more extras
    formData.append("noOfBedrooms", updatednoOfBedrooms);
    formData.append("noOfBathrooms", updatednoOfBathrooms);
    formData.append("floorLevel", updatedfloorLevel);
    formData.append("noOfBalconies", updatednoOfBalconies);
    // end
    formData.append("petFriendly", updatedPetFriendly);
    formData.append("availabilityStatus", updatedAvailabilityStatus);
    formData.append("ownerName", updatedOwnerName);
    formData.append("ownerContact", updatedOwnerContact);
    formData.append("elevator", updatedElevator);
    formData.append("generator", updatedGenerator);
    formData.append("security", updatedSecurity);
    formData.append("gym", updatedGym);
    formData.append("pool", updatedPool);
    formData.append("cctv", updatedCctv);
    formData.append("roofTopAllowed", updatedRoofTopAllowed);
    formData.append("username", username);
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
    navigate("/");
    window.location.reload(); // Navigate back to the home page
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full  mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Link to={"/"} className="bgt font-bold text-2xl">
          <FaRegArrowAltCircleLeft />
        </Link>
        <h2 className="text-3xl pop font-bold text-teal-700 text-center mb-6">
          Add Home for Rent/Sell
        </h2>

        {/* Location, Price and Short Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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

        {/* Short Description and Long Description */}
        <div className=" grid grid-cols-2 gap-6">
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Short Overview
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setShortDescription(e.target.value);
                }
              }}
              placeholder="Detailed description (max 250 characters)"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-sm text-gray-500">
              {longDescription.length}/100 characters
            </p>
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

        {/* Furnished, Year Built, Pet Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-6">
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
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Elevator
            </label>
            <input
              type="checkbox"
              checked={elevator}
              onChange={(e) => setElevator(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Generator
            </label>
            <input
              type="checkbox"
              checked={generator}
              onChange={(e) => setGenerator(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Security
            </label>
            <input
              type="checkbox"
              checked={security}
              onChange={(e) => setSecurity(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Gym</label>
            <input
              type="checkbox"
              checked={gym}
              onChange={(e) => setGym(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Pool</label>
            <input
              type="checkbox"
              checked={pool}
              onChange={(e) => setPool(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">CCTV</label>
            <input
              type="checkbox"
              checked={cctv}
              onChange={(e) => setCctv(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
          <div className="form-group flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Roof Top Allowed
            </label>
            <input
              type="checkbox"
              checked={roofTopAllowed}
              onChange={(e) => setRoofTopAllowed(e.target.checked)}
              className="w-5 h-5 text-teal-700 border-2 border-teal-700 focus:ring-teal-700"
            />
          </div>
        </div>

        {/* Availability, Owner Name, Owner Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
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
          {/* extra parts */}
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              School Distance
            </label>
            <select
              value={schoolDistance}
              onChange={(e) => setschoolDistance(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select</option>
              <option value="Apartment">Close</option>
              <option value="House">Medium</option>
              <option value="Condo">Far</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Hospital Distance
            </label>
            <select
              value={hospitalDistance}
              onChange={(e) => sethospitalDistance(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select</option>
              <option value="Apartment">Close</option>
              <option value="House">Medium</option>
              <option value="Condo">Far</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Main Road Distance
            </label>
            <select
              value={mainRoadDistance}
              onChange={(e) => setmainRoadDistance(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select</option>
              <option value="Apartment">Close</option>
              <option value="House">Medium</option>
              <option value="Condo">Far</option>
            </select>
          </div>
        </div>

        {/* New fields: Features, Restrictions, Deal Type */}
        {/* Features, Restrictions, Deal Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Features
            </label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Enter features"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Restrictions
            </label>
            <input
              type="text"
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
              placeholder="Enter restrictions"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Deal Type
            </label>
            <select
              value={dealType}
              onChange={(e) => setDealType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          {/* more extras */}
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <input
              type="number"
              value={noOfBedrooms === 0 ? "" : noOfBedrooms} // Show empty string if yearBuilt is 0
              onChange={(e) =>
                setnoOfBedrooms(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Enter Bedrooms"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <input
              type="number"
              value={noOfBathrooms === 0 ? "" : noOfBathrooms} // Show empty string if yearBuilt is 0
              onChange={(e) =>
                setnoOfBathrooms(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Enter Bathrooms"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">Floor</label>
            <input
              type="number"
              value={floorLevel === 0 ? "" : floorLevel} // Show empty string if yearBuilt is 0
              onChange={(e) =>
                setfloorLevel(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Enter Floor lvl"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Balconies
            </label>
            <input
              type="number"
              value={noOfBalconies === 0 ? "" : noOfBalconies} // Show empty string if yearBuilt is 0
              onChange={(e) =>
                setnoOfBalconies(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Enter Balconies"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          {/* end */}
        </div>

        {/* Showcase Image */}
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
          <div className="mt-4 grid lg:grid-cols-8 gap-2">
            {images.length > 0 &&
              Array.from(images).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className="w-full h-24  rounded-md"
                  />
                  <button
                    onClick={() => {
                      const newImages = images.filter((_, i) => i !== index);
                      setImages(newImages);
                    }}
                    className="absolute top-1 left-1 p-1 bg-red-600 text-white rounded-full text-xs"
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
//okk
