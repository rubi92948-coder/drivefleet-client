import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`;

// REGISTER
export const registerUser = (data) =>
  axios.post(`${BASE_URL}/register`, data, {
    withCredentials: true,
  });

// LOGIN
export const loginUser = (data) =>
  axios.post(`${BASE_URL}/login`, data, {
    withCredentials: true,
  });

// ME (JWT verify future use)
export const getMe = () =>
  axios.get(`${BASE_URL}/me`, {
    withCredentials: true,
  });