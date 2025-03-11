import React from "react";
import ConnectedUser from "../Fixed_components/ConnectedUser";
import ConnectedProf from "../Fixed_components/ConnectedProf";
import Navbar from "../Fixed_Layout/Navabr";
import { Outlet } from "react-router-dom";

function Messege_Layout() {
  return (
    <section className="flex flex-col min-h-screen">
      {" "}
      {/* Ensure full height */}
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-center flex-grow mt-12">
        <div className="grid grid-cols-1 md:grid-cols-7 w-[90%] border gap-4 flex-grow">
          <div className="md:col-span-2 border border-blue-600">
            <ConnectedUser />
          </div>
          <div className="md:col-span-3 flex flex-col flex-grow">
            {" "}
            {/* Allow expansion */}
            <Outlet />
          </div>
          <div className="md:col-span-2 border border-amber-600">
            <ConnectedProf />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Messege_Layout;
