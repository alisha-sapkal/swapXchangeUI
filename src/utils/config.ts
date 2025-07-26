import axios from "axios";
import Cookies from "universal-cookie"; 

const cookies = new Cookies();

export const axiosInstance = axios.create({
  baseURL: "",
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = cookies.get("token"); 

    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Token ${token}`;
      } else {
        config.headers = { Authorization: `Token ${token}` };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
