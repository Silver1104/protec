// Valentine Week 2026 dates
export const VALENTINE_WEEK = {
    START: new Date('2026-02-07T00:00:00'),
    ROSE_DAY: new Date('2026-02-07T00:00:00'),
    PROPOSE_DAY: new Date('2026-02-08T00:00:00'),
    CHOCOLATE_DAY: new Date('2026-02-09T00:00:00'),
    TEDDY_DAY: new Date('2026-02-10T00:00:00'),
    PROMISE_DAY: new Date('2026-02-11T00:00:00'),
    HUG_DAY: new Date('2026-02-12T00:00:00'),
    KISS_DAY: new Date('2026-02-13T00:00:00'),
    VALENTINE_DAY: new Date('2026-02-14T00:00:00'),
    END: new Date('2026-02-14T23:59:59'),
};

export const getCurrentDay = () => {
    const now = new Date();

    if (now < VALENTINE_WEEK.START) {
        return { index: -1, name: 'before', date: null };
    }

    if (now >= VALENTINE_WEEK.VALENTINE_DAY) {
        return { index: 7, name: 'valentine', date: VALENTINE_WEEK.VALENTINE_DAY };
    }

    const days = [
        { index: 0, name: 'rose', date: VALENTINE_WEEK.ROSE_DAY },
        { index: 1, name: 'propose', date: VALENTINE_WEEK.PROPOSE_DAY },
        { index: 2, name: 'chocolate', date: VALENTINE_WEEK.CHOCOLATE_DAY },
        { index: 3, name: 'teddy', date: VALENTINE_WEEK.TEDDY_DAY },
        { index: 4, name: 'promise', date: VALENTINE_WEEK.PROMISE_DAY },
        { index: 5, name: 'hug', date: VALENTINE_WEEK.HUG_DAY },
        { index: 6, name: 'kiss', date: VALENTINE_WEEK.KISS_DAY },
    ];

    for (let i = days.length - 1; i >= 0; i--) {
        if (now >= days[i].date) {
            return days[i];
        }
    }

    return { index: -1, name: 'before', date: null };
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
    const valentine = VALENTINE_WEEK.VALENTINE_DAY;

    if (now >= valentine) return 0;

    const diffTime = valentine - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};
