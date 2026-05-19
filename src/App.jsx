import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import Explore from "./pages/Explore";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-car" element={<AddCar />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>
  );
}

export default App;