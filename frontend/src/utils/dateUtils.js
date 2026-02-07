import { VALENTINE_WEEK } from './constants';

export const getCurrentDay = () => {
    const now = new Date();

    if (now < VALENTINE_WEEK.START) {
        return { index: -1, name: 'Before Valentine Week', emoji: '⏳' };
    }

    for (let i = VALENTINE_WEEK.DAYS.length - 1; i >= 0; i--) {
        if (now >= VALENTINE_WEEK.DAYS[i].date) {
            return VALENTINE_WEEK.DAYS[i];
        }
    }

    return { index: -1, name: 'Before Valentine Week', emoji: '⏳' };
};

export const getProgress = () => {
    const now = new Date();
    const start = VALENTINE_WEEK.START;
    const end = VALENTINE_WEEK.END;

    if (now < start) return 0;
    if (now > end) return 100;

    const totalDuration = end - start;
    const elapsed = now - start;
    const progress = (elapsed / totalDuration) * 100;

    return Math.min(100, Math.max(0, progress));
};

export const getDaysRemaining = () => {
    const now = new Date();
    const valentine = VALENTINE_WEEK.DAYS[7].date;

    if (now >= valentine) return 0;

    const diffTime = valentine - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

export const getTimeRemaining = () => {
    const now = new Date();
    const valentine = VALENTINE_WEEK.DAYS[7].date;

    if (now >= valentine) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const diffTime = valentine - now;

    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

export const isDay = (dayIndex) => {
    const currentDay = getCurrentDay();
    return currentDay.index === dayIndex;
};

export const isDayOrAfter = (dayIndex) => {
    const currentDay = getCurrentDay();
    return currentDay.index >= dayIndex;
};
