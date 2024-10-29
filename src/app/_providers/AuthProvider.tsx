'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';

import { IUser, userApi } from '@/entities/user';

type AuthContextType = {
    isAuthenticated: boolean;
    user?: IUser;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, isAuthenticated }: { children: ReactNode; isAuthenticated: boolean }) => {
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: userApi.me,
        enabled: isAuthenticated,
    });

    return <AuthContext.Provider value={{ isAuthenticated, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
