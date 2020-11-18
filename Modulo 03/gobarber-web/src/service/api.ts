import axios from 'axios';
import { create } from 'domain';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
