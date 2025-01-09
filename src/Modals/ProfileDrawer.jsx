import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useFetchUserData } from "../Authentication/UserDataContext"; // Import the custom hook

export default function ProfileDrawer() {
  const { userData, loading } = useFetchUserData(); // Use the hook to get user data and loading state

  if (loading) {
    return <div>Loading...</div>; // Show a loading message if data is being fetched
  }

  return (
    <section>
      <div className="container mt-12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className=" flex card shadow-xl flex-col col-span-1 md:flex-row gap-4">
          {/* this will be the card div */}
          <div className="p-6  flex flex-col items-center justify-center ">
            <img
              className="w-[100px] h-[100px] rounded-full"
              src={userData.profilpic}
              alt=""
            />
            <h1 className="font-bold text-teal-700 text-lg">
              @{userData.username}
            </h1>
            <p className=" font-semibold">{userData.address}</p>
          </div>
          {/* rating part */}
          <div className=" flex flex-col items-center justify-center gap-2">
            <p className="flex flex-col text-[16px] font-bold">
              5<span className="font-semibold text-[10px]">Reviews</span>
            </p>
            <hr className="w-full border-1 border-black" />
            <p className="flex flex-col font-bold">
              <p className="flex flex-row items-center gap-1">
                4.8
                <FaStar className=" inline-block" />
              </p>
              <span className="font-semibold text-[10px]">Rating</span>
            </p>
            <hr className="w-full border-1 border-black" />
            <p className="flex flex-col font-bold">
              2<span className="font-semibold text-[10px]">Hosting</span>
            </p>
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </section>
  );
}
