import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

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

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user_data");
        // Optional: Call backend logout endpoint
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
