import { useMemo } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add the token
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Handle unauthorized access (e.g., token expired)
          // You might want to redirect to login or refresh token here
          localStorage.removeItem("token");
          // Optionally: window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []); // Empty dependency array ensures this is created once

  return axiosSecure;
};

export default useAxiosSecure;