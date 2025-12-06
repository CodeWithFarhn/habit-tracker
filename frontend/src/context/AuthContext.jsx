import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setUser(user);
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        const user = await authService.login(userData);
        setUser(user);
        return user;
    };

    const signup = async (userData) => {
        const user = await authService.signup(userData);
        setUser(user);
        return user;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
