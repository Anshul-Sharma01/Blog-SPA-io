import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');

        if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = Cookies.get('refreshToken');
                    const response = await axiosInstance.post('users/refresh-token', {
                        refreshToken,
                    });

                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;

                    Cookies.set('accessToken', newAccessToken);
                    Cookies.set('refreshToken', newRefreshToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return axiosInstance(originalRequest);
                } catch (err) {

                    if (err.response && err.response.status === 401) {
                        localStorage.clear();
                        Cookies.remove('accessToken');
                        Cookies.remove('refreshToken');
                        window.location.href = 'http://localhost:5173/auth/login';
                    }
                    return Promise.reject(err);
                }
            }
        } else {
            console.error('Error with the request:', error.message);
        }

        return Promise.reject(error);
    }
);
export default axiosInstance;
