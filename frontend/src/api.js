import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust URL if needed

export const signup = async (data) => {
  return axios.post(`${API_URL}/signup`, data);
};

export const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const deleteUser = async (data) => {
  return axios.delete(`${API_URL}/username/${data.username}`, { data: { password: data.password } });
};
