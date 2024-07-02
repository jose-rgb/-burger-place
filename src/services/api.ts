import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://burger-place-api.vercel.app/',
});