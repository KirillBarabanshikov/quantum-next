import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IUser } from '@/entities/user/model';

interface SessionState {
    isAuthenticated: boolean;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    setAuthenticated: (status: boolean, user: IUser | null) => void;
    logout: () => void;
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,

            setAuthenticated: (status: boolean, user: IUser | null) => {
                set({ isAuthenticated: status, user });
            },

            setUser: (user: IUser | null) => {
                set({ user });
            },

            logout: () => {
                Cookies.remove('token');
                set({ isAuthenticated: false, user: null });
            },
        }),
        {
            name: 'session-store',
        },
    ),
);
