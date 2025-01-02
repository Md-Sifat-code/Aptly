import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main_Layout from "./Layout/Main_Layout";
import Buy from "./Pages/Buy";
import Sell from "./Pages/Sell";
import { CategoryProvider } from "./Context_Api/CategoryContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_Layout />,
    children: [
      {
        path: "/",
        element: <Buy />,
      },
      {
        path: "/sell",
        element: <Sell />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CategoryProvider>
      <RouterProvider router={router} />
    </CategoryProvider>
  </React.StrictMode>
);
