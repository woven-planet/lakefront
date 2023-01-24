export const createObserver = (callBack: () => void) => {
    return new IntersectionObserver(callBack);
};
