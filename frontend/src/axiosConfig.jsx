//import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001', // 或者你部署的后端地址
});

export default instance;
