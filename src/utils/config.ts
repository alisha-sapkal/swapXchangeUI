import axios from "axios";
import Cookies from "universal-cookie"; // Or use localStorage if preferred

const cookies = new Cookies();

export const axiosInstance = axios.create({
  baseURL: "",
});

// Add an interceptor to include the authorization token in every request
axiosInstance.interceptors.request.use(
  (config: any) => {
    // Retrieve token from cookies (or local storage)
    const token = cookies.get("token"); // Example: using Cookies, adjust as needed

    // If a token exists, add it to the request headers
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
    // Handle errors before they are sent
    return Promise.reject(error);
  }
);
