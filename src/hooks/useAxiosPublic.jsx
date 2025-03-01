import axios from "axios";

const useAxiosPublic = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  });
};

export default useAxiosPublic;
