import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { FlatContext } from "../Context_Api/FlatContext"; // Import the FlatContext

export default function Details() {
  const { flats, loading, error } = useContext(FlatContext); // Use context to get the data
  const { id } = useParams(); // Use useParams to get the `id` from the URL
  const [flat, setFlat] = useState(null);

  useEffect(() => {
    // Check if id exists before using it
    if (id) {
      const selectedFlat = flats.find((flat) => flat.id === parseInt(id));
      setFlat(selectedFlat);
    }
  }, [flats, id]); // Re-run when flats or the id changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!flat) return <div>Flat not found</div>;

  return (
    <div className="p-6">
      {/* Image Gallery */}
      <div className="flex flex-col items-center">
        <img
          src={flat.picture}
          alt={flat.title}
          className="w-96 h-72 object-cover mb-4"
        />
        <div className="flex space-x-2">
          {/* Small Images */}
          <img
            src={flat.picture}
            alt={`${flat.title} - 1`}
            className="w-24 h-24 object-cover"
          />
          <img
            src={flat.picture}
            alt={`${flat.title} - 2`}
            className="w-24 h-24 object-cover"
          />
          <img
            src={flat.picture}
            alt={`${flat.title} - 3`}
            className="w-24 h-24 object-cover"
          />
          <img
            src={flat.picture}
            alt={`${flat.title} - 4`}
            className="w-24 h-24 object-cover"
          />
        </div>
      </div>

      {/* Other Details */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">{flat.title}</h2>
        <p className="text-lg text-gray-500">Location: {flat.location}</p>
        <p className="text-lg text-gray-500">
          Price: ${flat.price.toLocaleString()}
        </p>
        <p className="mt-4">{flat.description}</p>
        <p className="mt-4">
          <strong>Availability: </strong>
          {flat.availability ? "Available" : "Not Available"}
        </p>
      </div>
    </div>
  );
}
