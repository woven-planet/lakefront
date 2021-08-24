const copy = (text: string): boolean => {
    try {
        navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        return false;
    }
};

export default copy;
