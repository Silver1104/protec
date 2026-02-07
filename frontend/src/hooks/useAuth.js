import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setIsAuthenticated(false);
        setUser(null);
    };

    return { isAuthenticated, user, login, logout };
};
