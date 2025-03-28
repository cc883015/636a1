// src/axiosConfig.jsx
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // 例如你的后端地址
  timeout: 5000
});

export default instance;
