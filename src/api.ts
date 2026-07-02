import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://lavanta-backend.onrender.com/api',
    withCredentials: true,
});

// Request interceptor for attaching the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for refreshing tokens
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('refresh-token') && !originalRequest.url?.includes('login')) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                const refreshToken = localStorage.getItem('refreshToken');
                const { data } = await api.post('/users/refresh-token', { refreshToken });

                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                }
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken);
                }

                // Update standard headers
                if (data.accessToken) {
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                }

                // Retry original request
                return api(originalRequest);
            } catch (err) {
                // If refresh fails, user is logged out
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.dispatchEvent(new Event('auth-logout'));
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
