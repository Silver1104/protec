// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add token to requests if available
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('adminToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // API methods
// export const authAPI = {
//     login: (credentials) => api.post('/auth/login', credentials),
//     register: (userData) => api.post('/auth/register', userData),
// };

// export const choicesAPI = {
//     save: (data) => api.post('/choices', data),
//     get: (day) => api.get(`/choices/${day}`),
//     getAll: () => api.get('/choices'),
// };

// export const bearAPI = {
//     save: (data) => api.post('/bear', data),
//     get: () => api.get('/bear'),
// };

// export const promisesAPI = {
//     markRead: () => api.post('/promises/read'),
//     get: () => api.get('/promises'),
// };

// export const hugsAPI = {
//     increment: () => api.post('/hugs'),
//     get: () => api.get('/hugs'),
// };

// export const puzzleAPI = {
//     complete: (data) => api.post('/puzzle/complete', data),
//     get: () => api.get('/puzzle'),
// };

// export const videoAPI = {
//     markWatched: () => api.post('/video/watch'),
//     get: () => api.get('/video'),
// };

// export const stressAPI = {
//     hit: (targetName) => api.post('/stress/hit', { targetName }),
//     get: () => api.get('/stress'),
// };

// export const photosAPI = {
//     getAll: (category) => api.get('/photos', { params: { category } }),
//     create: (data) => api.post('/photos', data),
//     update: (id, data) => api.put(`/photos/${id}`, data),
//     delete: (id) => api.delete(`/photos/${id}`),
// };

// export const datePlanAPI = {
//     getAll: () => api.get('/dateplan'),
//     create: (data) => api.post('/dateplan', data),
//     update: (id, data) => api.put(`/dateplan/${id}`, data),
//     delete: (id) => api.delete(`/dateplan/${id}`),
// };

// export const aimScoreAPI = {
//     save: (data) => api.post('/aimscore', data),
//     getAll: () => api.get('/aimscore'),
//     getHighScore: () => api.get('/aimscore/highscore'),
// };

// export const periodAPI = {
//     getAll: () => api.get('/period'),
//     create: (data) => api.post('/period', data),
//     update: (id, data) => api.put(`/period/${id}`, data),
//     delete: (id) => api.delete(`/period/${id}`),
// };

// export const adminAPI = {
//     getDashboard: () => api.get('/admin/dashboard'),
// };

// export default api;

import axios from 'axios';

// Automatically detect API URL based on environment
const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'production'
        ? 'https://your-backend-app.onrender.com/api'  // Update after deploying backend
        : 'http://localhost:5000/api');

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// API methods
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const choicesAPI = {
    save: (data) => api.post('/choices', data),
    get: (day) => api.get(`/choices/${day}`),
    getAll: () => api.get('/choices'),
};

export const bearAPI = {
    save: (data) => api.post('/bear', data),
    get: () => api.get('/bear'),
};

export const promisesAPI = {
    markRead: () => api.post('/promises/read'),
    get: () => api.get('/promises'),
};

export const hugsAPI = {
    increment: () => api.post('/hugs'),
    get: () => api.get('/hugs'),
};

export const puzzleAPI = {
    complete: (data) => api.post('/puzzle/complete', data),
    get: () => api.get('/puzzle'),
};

export const videoAPI = {
    markWatched: () => api.post('/video/watch'),
    get: () => api.get('/video'),
};

export const stressAPI = {
    hit: (targetName) => api.post('/stress/hit', { targetName }),
    get: () => api.get('/stress'),
};

export const photosAPI = {
    getAll: (category) => api.get('/photos', { params: { category } }),
    create: (data) => api.post('/photos', data),
    update: (id, data) => api.put(`/photos/${id}`, data),
    delete: (id) => api.delete(`/photos/${id}`),
};

export const datePlanAPI = {
    getAll: () => api.get('/dateplan'),
    create: (data) => api.post('/dateplan', data),
    update: (id, data) => api.put(`/dateplan/${id}`, data),
    delete: (id) => api.delete(`/dateplan/${id}`),
};

export const aimScoreAPI = {
    save: (data) => api.post('/aimscore', data),
    getAll: () => api.get('/aimscore'),
    getHighScore: () => api.get('/aimscore/highscore'),
};

export const periodAPI = {
    getAll: () => api.get('/period'),
    create: (data) => api.post('/period', data),
    update: (id, data) => api.put(`/period/${id}`, data),
    delete: (id) => api.delete(`/period/${id}`),
};

export const adminAPI = {
    getDashboard: () => api.get('/admin/dashboard'),
};

export default api;
