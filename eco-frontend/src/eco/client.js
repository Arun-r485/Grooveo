import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/eco";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});


api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/auth";
        }
        return Promise.reject(err);
    }
);

export default api;