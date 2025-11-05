import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Automatically attach JWT token to all requests if exists
API.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const { token } = JSON.parse(auth);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
