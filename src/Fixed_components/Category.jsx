import React, { useContext } from "react";
import { CategoryContext } from "../Context_Api/CategoryContext";

// Correctly import each icon from its respective package
import { PiBuildingApartmentBold } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { IoHome } from "react-icons/io5"; // Note: use "io5" for Io icons
import {
  GiModernCity,
  GiWoodCabin,
  GiTreehouse,
  GiCastle,
} from "react-icons/gi";
import {
  RiBuilding2Fill,
  RiVipCrownFill,
  RiSmartphoneFill,
} from "react-icons/ri"; // Corrected RiSmartphone import
import { MdVilla, MdBeachAccess, MdAttachMoney } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

const iconLibraryMap = {
  pi: PiBuildingApartmentBold,
  ai: AiOutlineHome,
  fa: FaHome,
  io: IoHome, // Corrected import for IoHome icon
  gi: GiModernCity, // Example: You can add other Gi icons in a similar way
  ri: RiBuilding2Fill,
  md: MdVilla,
  bs: BsPeople,
};

export default function Category() {
  const { categories, loading } = useContext(CategoryContext);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="w-[90%] mx-auto ">
      <ul className="flex gap-6 overflow-x-auto hide-scrollbar">
        {categories.map((category) => {
          // Get the corresponding icon component based on the library
          const IconComponent = iconLibraryMap[category.iconLibrary];

          return (
            <li
              key={category.id}
              className="flex flex-col items-center gap-2 p-4"
              style={{
                width: "120px", // Fixed width for each item
                height: "120px", // Fixed height to make it square
              }}
            >
              <div
                className="flex items-center justify-center bg-gray-200 text-gray-600 rounded-full w-[50px] h-[40px]" // Circle container
              >
                {IconComponent && (
                  <IconComponent className="text-xl text-black " />
                )}
              </div>
              <span className="text-sm font-medium text-center">
                {category.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
