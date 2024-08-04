import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    const navigate = useNavigate();

    // Use effect to set the token and authentication state on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
            // Validate the token with the server
            // validateToken(savedToken);
        }
        setLoading(false);
    }, []);

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const signup = async ({ firstName, lastName, email, password }) => {
        try {
            const response = await axios.post('/api/auth/register', { firstName, lastName, email, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/home');
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while checking token
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};