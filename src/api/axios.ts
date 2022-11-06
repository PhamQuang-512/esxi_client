import axios from "axios";

export const isAxiosError = axios.isAxiosError;

const api = axios.create({
	baseURL: "//localhost:8080",
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
