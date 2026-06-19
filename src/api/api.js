import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://tour-travel-backend-d6i9.onrender.com/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiAdmin = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 */

apiAdmin.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */

apiAdmin.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response &&
      [401, 403].includes(
        error.response.status
      )
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default apiClient;