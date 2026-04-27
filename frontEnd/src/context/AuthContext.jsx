import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL || 'http://localhost:5011';

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check local storage or cookie on load
        const storedUser = localStorage.getItem("user_data");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user_data", JSON.stringify(userData));
    };

    const logout = async () => {
        // Call backend to clear the HTTP-only auth cookie
        try {
            await fetch(`${API}/api/user/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout API call failed:', err);
        }
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user_data");
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
