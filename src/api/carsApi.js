import axios from "axios";

const BASE_URL = "http://localhost:5000/api/cars";

// ➕ Add Car
export const addCar = (data) => {
  return axios.post(BASE_URL, data);
};

// 📥 Get Cars
export const getCars = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// 🗑 Delete Car
export const deleteCar = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

// ✏️ Update Car
export const updateCar = (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};