import { useState, useEffect } from 'react';
import { getCurrentDay } from '../utils/dateUtils';

export const useCurrentDay = () => {
    const [currentDay, setCurrentDay] = useState(getCurrentDay());

    useEffect(() => {
        const updateDay = () => {
            setCurrentDay(getCurrentDay());
        };

        // Update every second
        const interval = setInterval(updateDay, 1000);

        return () => clearInterval(interval);
    }, []);

    return currentDay;
};
