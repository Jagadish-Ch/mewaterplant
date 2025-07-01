import axios from 'axios';

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => {
    alert(err.message)
    Promise.reject(err);
  }
);

export default axiosInstance;