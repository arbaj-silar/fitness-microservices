import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (userId) {
      config.headers["X-User-ID"] = userId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getActivities = () => {
  return api.get("/activities");
};

export const addActivity = (activity) => {
  return api.post("/activities", activity);
};

export const getActivityDetail = (id) => {
  return api.get(`/recommendations/activity/${id}`);
};

export default api;
