import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let hasWarnedAboutToken = false;

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      if (import.meta.env.DEV) {
        console.log("JWT token: ", token);
      }
    } else if (!hasWarnedAboutToken) {
      if (import.meta.env.DEV) {
        console.warn("No auth token found. Requests may fail with 401 Unauthorized.");
      }
      hasWarnedAboutToken = true;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define API endpoint paths
const apiEndpoints = {
  users: () => "/users",
  userByEmail: (email) => `/users/${email}`,
  thresholdsForUser: (id) => `/users/${id}/thresholds`,
  threshold: (id) => (id ? `/thresholds/${id}` : "/thresholds"),
  recipients: () => "/recipients",
  data: () => "/data",
};

// Unified API service with dynamic endpoints
export const apiService = {
  get: (endpoint, param) => {
    const url = apiEndpoints[endpoint](param);
    return API.get(url);
  },
  post: (endpoint, data) => {
    const url = endpoint === "users" ? "/users" : apiEndpoints[endpoint](data?.id);
    return API.post(url, data);
  },
  put: (endpoint, data) => {
    const url = apiEndpoints[endpoint](data?.id);
    return API.put(url, data);
  },
  delete: (endpoint, id) => {
    const url = apiEndpoints[endpoint](id);
    return API.delete(url);
  },
};

export default API;
