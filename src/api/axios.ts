import axios from 'axios';

export const isAxiosError = axios.isAxiosError;

const api = axios.create({
    baseURL: '//192.168.1.2:8080/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;
