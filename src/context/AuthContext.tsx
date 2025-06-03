'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

interface AuthContextType {
    user: any;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user, isLoaded } = useUser();

    return (
        <AuthContext.Provider value={{ user, isLoaded }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 