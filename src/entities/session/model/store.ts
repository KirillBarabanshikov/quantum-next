import Cookies from 'js-cookie';
import { create } from 'zustand';

import { IUser } from '@/entities/user/model';

interface SessionState {
    isAuthenticated: boolean;
    user: IUser | null;
    setAuthenticated: (status: boolean, user: IUser | null) => void;
    logout: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    isAuthenticated: false,
    user: null,

    setAuthenticated: (status: boolean, user: IUser | null) => {
        set({ isAuthenticated: status, user });
    },

    logout: () => {
        Cookies.remove('token');
        set({ isAuthenticated: false, user: null });
    },
}));
