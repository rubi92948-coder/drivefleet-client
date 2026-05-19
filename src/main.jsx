import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import Explore from "./pages/Explore";
import Bookings from "./pages/Bookings";
import CarDetails from "./pages/CarDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/add-car",
    element: (
      <Layout>
        <AddCar />
      </Layout>
    ),
  },
  {
    path: "/explore-cars",
    element: (
      <Layout>
        <Explore />
      </Layout>
    ),
  },
  {
    path: "/bookings",
    element: (
      <Layout>
        <Bookings />
      </Layout>
    ),
  },
   {
    path: "/car/:id",
    element: <CarDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);