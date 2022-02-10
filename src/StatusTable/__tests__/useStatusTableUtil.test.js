import { filterData, getCompareFormat, mapTableFilters, sortData } from '../useStatusTableUtil';

const FILTER_VALUES = {
    logId: 'id123',
    discoveredOn: '2020-01-20'
};

const DATA = [
    {
        log_id: 'tri408/D_20210120_131101/d001/data-01-20-2021_13-11-10.tlog',
        discovered_on: '2021-01-22T15:58:03.966361Z',
        ingestion_milliseconds: 377
    },
    {
        log_id: 'tri408/D_20210120_131101/d001/data-01-20-2021_13-11-110.tlog',
        discovered_on: '2021-01-23T15:58:03.966361Z',
        ingestion_milliseconds: 377
    },
    {
        log_id: 'tri408/D_20210120_131101/d001/data-01-20-2021_13-11-12.tlog',
        discovered_on: '2021-01-21T15:58:03.966361Z',
        ingestion_milliseconds: 377
    },
    {
        log_id: 'tri408/D_20210120_131101/d001/data-01-20-2021_13-11-110.tlog',
        discovered_on: '2021-01-23T15:58:03.966361Z',
        ingestion_milliseconds: 1400
    }
];

describe('mapTableFilters', () => {
    it('Maps valid filterValue keys to "new key, same value" pairs object.', () => {
        const validFilterMap = {
            logId: 'log_id',
            discoveredOn: 'discovered_on'
        };

        const tableFilters = mapTableFilters(FILTER_VALUES, validFilterMap);

        expect(tableFilters.log_id).toBe(FILTER_VALUES.logId);
        expect(tableFilters.discovered_on).toBe(FILTER_VALUES.discoveredOn);
    });

    it('Returns object without mapped keys if no valid filterValue keys are found.', () => {
        const invalidFilterMap = {
            LOG_ID: 'log_id',
            DISCOVERED_ON: 'discovered_on'
        };

        const tableFilters = mapTableFilters(FILTER_VALUES, invalidFilterMap);

        expect(tableFilters.log_id).toBeUndefined();
        expect(tableFilters.discovered_on).toBeUndefined();
    });
});

describe('getCompareFormat', () => {
    it('Returns the value if input is a number.', () => {
        expect(getCompareFormat(1)).toBe(1);
    });

    it('Returns an uppercased string if input is not a number.', () => {
        expect(getCompareFormat('abc')).toBe('ABC');
    });
});

describe('filterData', () => {
    it('Returns two results when single filter matches multiple records.', () => {
        expect(
            filterData({ log_id: '10.tlog' })(DATA)
        ).toHaveLength(3);
    });

    it('Returns one result when multiple filters match single record.', () => {
        expect(
            filterData({ log_id: '10.tlog', discovered_on: DATA[1].discovered_on })(DATA)
        ).toHaveLength(2);
    });

    it('Returns no results when no records match filter criteria.', () => {
        expect(
            filterData({ log_id: '.txt' })(DATA)
        ).toHaveLength(0);
    });

    it('Returns all results when filter is empty.', () => {
        expect(
            filterData({})(DATA)
        ).toHaveLength(4);
    });
});

describe('sortData', () => {
    it('Returns results sorted in descending order when ascending is undefined', () => {
        const sortedData = sortData({ orderBy: 'discovered_on' })(DATA);

        expect(sortedData[0].log_id).toBe(DATA[1].log_id);
        expect(sortedData[3].log_id).toBe(DATA[2].log_id);
    });

    it('Returns results sorted in the requested orderBy priority', () => {
        const sortedData = sortData({ orderBy: ['discovered_on', 'ingestion_milliseconds'] })(DATA);

        expect(sortedData[0].ingestion_milliseconds).toBe(DATA[3].ingestion_milliseconds);
    });

    it('Returns results sorted in ascending order when ascending is true', () => {
        const sortedData = sortData({ orderBy: 'ingestion_milliseconds', ascending: true })(DATA);

        expect(sortedData[3].ingestion_milliseconds).toBe(DATA[3].ingestion_milliseconds);
    });
});
