export const generateScrollToUrl = (title: string) => {
    return `${window.location.origin}${window.location.pathname}#${encodeURIComponent(title)}`;
};
