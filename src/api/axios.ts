import axios from 'axios';

export const isAxiosError = axios.isAxiosError;

const api = axios.create({
    baseURL: '//localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;
