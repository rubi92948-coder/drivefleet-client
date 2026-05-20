import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import Explore from "./pages/Explore";
import Bookings from "./pages/Bookings";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyAddedCars from "./pages/MyAddedCars";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound"; // NotFound পেজটি ইমপোর্ট করুন

// PUBLIC WRAPPER
const PublicLayout = ({ children }) => (
  <Layout>{children}</Layout>
);

// PROTECTED WRAPPER
const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicLayout>
        <Home />
      </PublicLayout>
    ),
  },

  {
    path: "/add-car",
    element: (
      <ProtectedLayout>
        <AddCar />
      </ProtectedLayout>
    ),
  },

  {
    path: "/explore-cars",
    element: (
      <ProtectedLayout>
        <Explore />
      </ProtectedLayout>
    ),
  },

  {
    path: "/bookings",
    element: (
      <ProtectedLayout>
        <Bookings />
      </ProtectedLayout>
    ),
  },

  {
    path: "/car/:id",
    element: (
      <ProtectedLayout>
        <CarDetails />
      </ProtectedLayout>
    ),
  },

  {
    path: "/cars/:id",
    element: (
      <ProtectedLayout>
        <CarDetails />
      </ProtectedLayout>
    ),
  },

  {
    path: "/my-added-cars",
    element: (
      <ProtectedLayout>
        <MyAddedCars />
      </ProtectedLayout>
    ),
  },

  {
    path: "/profile", 
    element: (
      <ProtectedLayout>
        <Profile />
      </ProtectedLayout>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  // 404 Not Found Route - এটি অবশ্যই সব রাউটের শেষে দিতে হয়
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);