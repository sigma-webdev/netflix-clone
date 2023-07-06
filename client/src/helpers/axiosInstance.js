import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;
// axiosInstance.defaults.timeout = 10000

export default axiosInstance;
