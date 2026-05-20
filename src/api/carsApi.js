import axios from "axios";

const BASE_URL = "http://localhost:5000/api/cars";

// ➕ ADD
export const addCar = (data) =>
  axios.post(BASE_URL, data, {
    withCredentials: true,
  });

// 📥 GET
export const getCars = async () => {
  const res = await axios.get(BASE_URL, {
    withCredentials: true,
  });
  return res.data;
};

// 🗑 DELETE
export const deleteCar = (id) =>
  axios.delete(`${BASE_URL}/${id}`, {
    withCredentials: true,
  });

// ✏️ UPDATE
export const updateCar = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data, {
    withCredentials: true,
  });