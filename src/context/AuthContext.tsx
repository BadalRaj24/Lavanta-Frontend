import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar?: string;
    isAdmin: boolean;
    accessToken?: string;
    refreshToken?: string;
    token?: string; // For backwards compatibility
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    updateUser: (userData: User) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await api.get('/users/profile');
                const localToken = localStorage.getItem('accessToken');
                if (localToken) {
                    data.accessToken = localToken;
                    data.token = localToken;
                }
                setUser(data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        const handleLogout = () => {
            setUser(null);
        };

        window.addEventListener('auth-logout', handleLogout);
        return () => {
            window.removeEventListener('auth-logout', handleLogout);
        };
    }, []);

    const login = (userData: User) => {
        const token = userData.accessToken || userData.token;
        if (token) {
            localStorage.setItem('accessToken', token);
            userData.accessToken = token;
            userData.token = token;
        }
        if (userData.refreshToken) {
            localStorage.setItem('refreshToken', userData.refreshToken);
        }
        setUser(userData);
    };

    const logout = async () => {
        try {
            await api.post('/users/logout');
        } catch (error) {
            console.error('Logout error', error);
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    const updateUser = (userData: User) => {
        const token = userData.accessToken || userData.token;
        if (token) {
            localStorage.setItem('accessToken', token);
            userData.accessToken = token;
            userData.token = token;
        }
        if (userData.refreshToken) {
            localStorage.setItem('refreshToken', userData.refreshToken);
        }
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
