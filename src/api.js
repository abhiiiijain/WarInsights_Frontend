import axios from "axios";
import { getToken } from "./utils/auth";

const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || "Registration failed");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || "Login failed");
  }
};

export const fetchWarlog = async (clanTag) => {
  try {
    const response = await axiosInstance.post("/warlog", { clanTag });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Failed to fetch warlog");
  }
};

export const updateRole = async (userId, role) => {
  try {
    const response = await axiosInstance.post("/update-role", { userId, role });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || "Failed to update role");
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || "Failed to fetch user profile");
  }
};

export const fetchClanTags = async () => {
  try {
    const response = await axiosInstance.get("/clantags");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Failed to fetch clan tags");
  }
};

export default axiosInstance;
