import { FilterMap, FilterValues } from 'src/Filter/types';

export interface SortOptions {
    orderBy: string | string[];
    ascending?: boolean;
}

/**
* mapTableFilters was primarily created to mitigate api inconsistencies.
* For instance while 'log_id' is used by most endpoints,
* others use 'name' to bring back the same data.
* In order to target for filtering across tables,
* we needed a way to target all with the same property.
*/
export const mapTableFilters = (filterValues: FilterValues, filterMap: FilterMap): FilterMap => {
    const filterPairs = Object.entries(filterMap);

    return filterPairs.reduce((acc, hashMap) => {
        const [filterValuesKey, mapKey] = hashMap;

        if (Object.keys(filterValues).includes(filterValuesKey)) {
            return { ...acc, [mapKey]: filterValues[filterValuesKey] };
        }

        return acc;
    }, {});
};

export const getCompareFormat = (value: any): number | string => {
    if (typeof value === 'number') {
        return value;
    }

    return value?.toString()?.toUpperCase();
};

export const sortByField = <T extends unknown>(
    ascending: boolean,
    inboundData: T[],
    field: string
): T[] => {
    const dataCopy = inboundData.slice();

    return dataCopy.sort((a, b) => {
        const fieldA = getCompareFormat((a as any)[field]);
        const fieldB = getCompareFormat((b as any)[field]);

        if (fieldA < fieldB) {
            return ascending ? -1 : 1;
        }

        if (fieldA > fieldB) {
            return ascending ? 1 : -1;
        }

        return 0;
    });
};

export const filterData = (
    filters: FilterMap
) => <T extends unknown>(inboundData: T[] | null): T[] | null => {
    const filterPairs = Object.entries(filters || []);

    const filteredData = filterPairs.reduce((currentData, filterPair) => {
        const [filterKey, userInput] = filterPair;

        return currentData?.filter((data) => {
            return (data as any)[filterKey]?.toLowerCase().includes(userInput.toLowerCase());
        }) || null;
    }, inboundData);

    return filteredData;
};

export const sortData = (
    sortOptions: SortOptions
) => <T extends unknown>(inboundData: T[]): T[] => {
    const orderBy = typeof sortOptions.orderBy === 'string' ? [sortOptions.orderBy] : sortOptions.orderBy;
    const ascending = Boolean(sortOptions.ascending);

    const sortedData = orderBy.reduce((currentData, field) => {
        return !field ? currentData : sortByField(ascending, currentData, field);
    }, inboundData);

    return sortedData;
};
