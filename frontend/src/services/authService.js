import api from './api';

const authService = {
    signup: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    login: async (userData) => {
        const response = await api.post('/auth/login', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/auth/profile', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },
};

export default authService;
