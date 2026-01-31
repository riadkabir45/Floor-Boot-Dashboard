/** @format */

import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: 'http://10.10.12.15:8089/api/v1',
  timeout: 5000
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;