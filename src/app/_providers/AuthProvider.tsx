'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect } from 'react';

import { productApi, useFavoritesStore } from '@/entities/product';
import { IUser, userApi } from '@/entities/user';

type AuthContextType = {
    isAuthenticated: boolean;
    user?: IUser;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, isAuthenticated }: { children: ReactNode; isAuthenticated: boolean }) => {
    const { setProductsIds } = useFavoritesStore((state) => state);

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: userApi.me,
        enabled: isAuthenticated,
    });

    useEffect(() => {
        if (!user) return;

        const syncFavorites = async () => {
            const favoritesIds = await productApi.fetchFavoritesProducts();
            favoritesIds && setProductsIds(favoritesIds);
        };

        syncFavorites();
    }, [user]);

    return <AuthContext.Provider value={{ isAuthenticated, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
