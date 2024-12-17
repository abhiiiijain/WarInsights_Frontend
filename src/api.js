import axios from 'axios';
import { getToken } from './utils/auth';  // Utility to get JWT

const BASE_URL = 'http://localhost:5000/api';

// Create an axios instance to include the token in headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || 'Registration failed');
  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || 'Login failed');
  return data;
};

export const fetchWarlog = async (clanTag) => {
  const response = await fetch(`${BASE_URL}/warlog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clanTag }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch warlog');
  return data;
};

export const updateRole = async (userId, role) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${BASE_URL}/update-role`,
    { userId, role },
    { headers: { 'x-auth-token': token } }
  );
  return response.data;
};

// Example API call to get the user profile
export const getUserProfile = async () => {
  const response = await axiosInstance.get('/profile');
  return response.data;
};

export default axiosInstance;