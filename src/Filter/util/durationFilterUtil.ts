import { MinMax } from 'src/Filter/modules/DurationFilter/MinMaxInput';

export const getMinMaxFromKey = (key: any): MinMax | undefined => {
    const [min, max] = key.split('~');

    if (min || max) {
        return { min, max };
    }

    return undefined;
};
