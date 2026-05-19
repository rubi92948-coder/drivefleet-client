import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';

import Home from './pages/Home';
import AddCar from './pages/AddCar';
import Explore from './pages/Explore';
import Bookings from './pages/Bookings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-car",
    element: <AddCar />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);