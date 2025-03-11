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
import ProfileDrawer from "./Modals/ProfileDrawer";
import SignupModal from "./Modals/SignupModal";
import SellerDetails from "./Fixed_components/SellerDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./Error/Error";
import Messege_Layout from "./Layout/Messege_Layout";
import Messages from "./Chatting_System/Messeges";
import { WebSocketProvider } from "./Authentication/WebSocketContext";
// Ensure correct filename spelling

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_Layout />,
    errorElement: <Error />,
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
      {
        path: "/profile/:username",
        element: <ProfileDrawer />,
      },
      {
        path: "/seller/:username",
        element: <SellerDetails />,
      },
    ],
  },
  {
    path: "/add-home",
    element: <AddHomeForm />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignupModal />,
    errorElement: <Error />,
  },
  {
    path: "/messege",
    element: <Messege_Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/messege/:senderId/:recipientId",
        element: <Messages />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <UserDataProvider>
        <UserProviders>
          <FlatProvider>
            <CategoryProvider>
              <WebSocketProvider>
                <RouterProvider router={router} />
                <ToastContainer />
              </WebSocketProvider>
            </CategoryProvider>
          </FlatProvider>
        </UserProviders>
      </UserDataProvider>
    </UserProvider>
  </React.StrictMode>
);
