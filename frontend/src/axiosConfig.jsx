import axios from 'axios';

const instance = axios.create({
  //baseURL: 'http://localhost:5002',
  
    baseURL: 'http://54.252.220.220:5001'
  });
  
;

export default instance;
