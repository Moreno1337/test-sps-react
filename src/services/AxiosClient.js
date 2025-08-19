import axios from "axios";

const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:3000",
});

AxiosClient.interceptors.request.use((config) => {
  if (config.auth !== false) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status;
    const cfg = err.config || {};
    if (status === 401 && cfg.auth !== false) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") window.location.href = "/login";
    }
    const msg = err.response?.data?.message || err.message || "Erro na requisição";
    return Promise.reject(new Error(msg));
  }
);

export default AxiosClient;

