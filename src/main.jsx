import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import Explore from "./pages/Explore";
import Bookings from "./pages/Bookings";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyAddedCars from "./pages/MyAddedCars";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },

  // PROTECTED ROUTES
  {
    path: "/add-car",
    element: (
      <ProtectedRoute>
        <Layout>
          <AddCar />
        </Layout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/explore-cars",
    element: (
      <ProtectedRoute>
        <Layout>
          <Explore />
        </Layout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/bookings",
    element: (
      <ProtectedRoute>
        <Layout>
          <Bookings />
        </Layout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/car/:id",
    element: (
      <ProtectedRoute>
        <CarDetails />
      </ProtectedRoute>
    ),
  },

  // AUTH ROUTES
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  
  {
  path: "/my-added-cars",
  element: (
    <ProtectedRoute>
      <Layout>
        <MyAddedCars />
      </Layout>
    </ProtectedRoute>
  ),
},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);