import axios from "axios";

export const axiosconfig = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, 
  withCredentials: true,
   headers: {
    "Content-Type": "application/json",
  },
});
