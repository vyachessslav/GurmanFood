import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token');
        console.log(token)
        console.log(user)
        if (!token) {
            setUser(null)
            return
        }
        if (token && !user) {

            fetchUserData(token);
        }
     }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('/auth/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const login = async (userData) => {
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isAuthenticated: !!user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);