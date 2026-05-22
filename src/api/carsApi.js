import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/cars`;


export const addCar = (data) =>
  axios.post(BASE_URL, data, {
    withCredentials: true,
  });


export const getCars = async () => {
  const res = await axios.get(BASE_URL, {
    withCredentials: true,
  });
  return res.data;
};


export const deleteCar = (id) =>
  axios.delete(`${BASE_URL}/${id}`, {
    withCredentials: true,
  });


export const updateCar = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data, {
    withCredentials: true,
  });