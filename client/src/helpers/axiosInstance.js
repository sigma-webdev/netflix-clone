import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;

const axiosInstance = axios.create({
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
