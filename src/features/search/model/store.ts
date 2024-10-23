import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';

interface ISearchStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const useSearchStore = create<ISearchStore>()(
    devtools(
        (set) => ({
            isOpen: false,
            setIsOpen: (isOpen: boolean) => set({ isOpen }),
        }),
        {
            name: 'search',
        },
    ),
);
