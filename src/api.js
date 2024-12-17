const BASE_URL = 'http://localhost:5000/api';

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
