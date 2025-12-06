import api from './api';

const habitService = {
    getHabits: async () => {
        const response = await api.get('/habits');
        return response.data;
    },

    createHabit: async (habitData) => {
        const response = await api.post('/habits', habitData);
        return response.data;
    },

    updateHabit: async (id, habitData) => {
        const response = await api.put(`/habits/${id}`, habitData);
        return response.data;
    },

    deleteHabit: async (id) => {
        const response = await api.delete(`/habits/${id}`);
        return response.data;
    },
};

export default habitService;
