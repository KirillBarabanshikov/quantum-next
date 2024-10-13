import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
    const [isMatch, setIsMatch] = useState<boolean>(false);

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        const handleChange = () => {
            setIsMatch(matchMedia.matches);
        };

        handleChange();

        matchMedia.addEventListener('change', handleChange);

        return () => matchMedia.removeEventListener('change', handleChange);
    }, [query]);

    return { isMatch };
};
