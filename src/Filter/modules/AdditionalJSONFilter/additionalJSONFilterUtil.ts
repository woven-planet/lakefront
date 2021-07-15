/**
 * isActualValue determines if the provided value
 * is truthy and is non-empty.
 */
export const isActualValue = (value: any) => {
    if (!value) {
        return false;
    }
    
    return Object.keys(value).length > 0;
};
