import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5002/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
};

export const signup = async (fullName, email, password) => {
    const res = await api.post('/auth/signup', { fullName, email, password });
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getTasks = async () => {
    const res = await api.get('/data/tasks');
    return res.data;
};

export const addTask = async (text) => {
    const res = await api.post('/data/tasks', { text });
    return res.data;
};

export const updateTask = async (id, updates) => {
    const res = await api.put(`/data/tasks/${id}`, updates);
    return res.data;
};

export const deleteTask = async (id) => {
    const res = await api.delete(`/data/tasks/${id}`);
    return res.data;
};

export const reorderTasks = async (tasks) => {
    const res = await api.put('/data/tasks/reorder', { tasks });
    return res.data;
};

export const submitDay = async () => {
    const res = await api.post('/data/day-submission');
    return res.data;
};

export const getAnalytics = async () => {
    const res = await api.get('/data/analytics');
    return res.data;
};

export default api;
