import { useState, useEffect } from 'react';
import { getProgress, getTimeRemaining } from '../utils/dateUtils';

export const useProgress = () => {
    const [progress, setProgress] = useState(getProgress());
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

    useEffect(() => {
        const updateProgress = () => {
            setProgress(getProgress());
            setTimeRemaining(getTimeRemaining());
        };

        // Update every second
        const interval = setInterval(updateProgress, 1000);

        return () => clearInterval(interval);
    }, []);

    return { progress, timeRemaining };
};
