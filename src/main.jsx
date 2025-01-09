import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main_Layout from "./Layout/Main_Layout";
import Buy from "./Pages/Buy";
import Sell from "./Pages/Sell";
import { CategoryProvider } from "./Context_Api/CategoryContext";
import { FlatProvider } from "./Context_Api/FlatContext";
import Details from "./Fixed_components/Details";
import AddHomeForm from "./Modals/AddHomeForm";
import { UserProvider } from "./Authentication/UserContext";
import { UserProviders } from "./Authentication/UserContexts";
import { UserDataProvider } from "./Authentication/UserDataContext";

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
      {
        path: "/details/:id",
        element: <Details />,
      },
    ],
  },
  {
    path: "/add-home",
    element: <AddHomeForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <UserDataProvider>
        <UserProviders>
          <FlatProvider>
            <CategoryProvider>
              <RouterProvider router={router} />
            </CategoryProvider>
          </FlatProvider>
        </UserProviders>
      </UserDataProvider>
    </UserProvider>
  </React.StrictMode>
);
