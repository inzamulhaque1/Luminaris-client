import { useMemo } from "react";
import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
      headers: {
        "Content-Type": "application/json",
        // Add any other default headers here
      },
    });
  }, []); // Empty dependency array ensures this is only created once

  return axiosPublic;
};

export default useAxiosPublic;