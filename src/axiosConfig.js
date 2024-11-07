import axios from "axios";
import store from "./redux/store";

axios.defaults.baseURL = "http://localhost:8000"; // Replace with backend URL
axios.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
