const THUMB_HALF_WIDTH = 7;

export const getPercentage = (current: any, max: any) => (100 * current) / max;

export const getValue = (percentage: any, max: any) => Math.round((max / 100) * percentage);

export const getLeft = (percentage: any) => `calc(${percentage}% - ${THUMB_HALF_WIDTH}px)`;

export const throttled = (delay: any, fn: any) => {
    let lastCall = 0;
    return function (...args: any) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return fn(...args);
    };
};
