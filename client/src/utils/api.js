import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://youtube-summerize-app.up.railway.app/api',
  withCredentials: true,
});

export default api;
