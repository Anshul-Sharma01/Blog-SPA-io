import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


const BASE_URL = "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

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

        if (error.response.status === 403 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(async (resolve, reject) => {
                try {
                    const refreshToken = Cookies.get('refreshToken');
                    const response = await axiosInstance.post('/users/refresh-token', { refreshToken });

                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;

                    Cookies.set('accessToken', newAccessToken);
                    Cookies.set('refreshToken', newRefreshToken);

                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    processQueue(null, newAccessToken);
                    resolve(axiosInstance(originalRequest));
                } catch (err) {
                    processQueue(err, null);
                    reject(err);
                } finally {
                    isRefreshing = false;
                }
            });
        } else if (error.response.status === 401) {
            window.alert("Please Log In again..");
            localStorage.clear();
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            window.location.href = '/auth/login';
        }

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
            if (error.response.status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = Cookies.get('refreshToken');
                    const response = await axiosInstance.post('/users/refresh-token', {
                        refreshToken,
                    });

                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;

                    Cookies.set('accessToken', newAccessToken);
                    Cookies.set('refreshToken', newRefreshToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.error('Error refreshing access token:', err);
                    return Promise.reject(err);
                }
            }else if(error.response.status === 401){
                toast.error("Please Log In again!");
                console.log("please log in again!");
                localStorage.clear();
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.href = 'http://localhost:5173/auth/login';
            }
        } else {
            console.error('Error with the request:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;