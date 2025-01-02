import React from "react";
import { Outlet } from "react-router-dom";
import Navabr from "../Fixed_Layout/Navabr";
import Footer from "../Fixed_Layout/Footer";

export default function Main_Layout() {
  return (
    <div>
      <Navabr />
      <Outlet />
      <Footer />
    </div>
  );
}
