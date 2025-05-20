"use client"

import { createContext, useState, useContext, ReactNode } from 'react';

type User = { name: string } | null;

const AuthContext = createContext<{
    user: User;
    setUser: (user: User) => void;
}>({
    user: null,
    setUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);