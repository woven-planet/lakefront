import { render, fireEvent, cleanup } from '@testing-library/react';

import Table from '../Table';

afterAll(cleanup);

const columns = [
    {
        Header: 'RELEASE',
        accessor: 'release',
        Cell: ({ cell: { value } }) => value
    },
    {
        Header: 'COUNT',
        accessor: 'unique_issues'
    },
    {
        Header: 'KM',
        accessor: 'autonomous_km'
    },
    {
        Header: 'KM / ISSUE',
        accessor: 'km_disengagement',
        Cell: ({ cell: { value } }) => value?.toFixed(4) || ''
    },
    {
        Header: 'ISSUE / 100 KM',
        accessor: 'issue_km',
        Cell: ({ cell: { value } }) => value?.toFixed(4) || ''
    }
];

const customData = [{ release: 'r2204_1_0', unique_issues: 24, autonomous_km: 166.992, km_disengagement: 6.9579999999, issue_km: 0.14371985 },
{ release: 'r2002_1_0', unique_issues: 3, autonomous_km: 47.442, km_disengagement: 15.814, issue_km: 0.063491 },
{ release: 'r2010_1_0', unique_issues: 5, autonomous_km: 25.68, km_disengagement: 5.136, issue_km: 0.1947675 },
{ release: 'r2019_1_0', unique_issues: 51, autonomous_km: 291.549, km_disengagement: 5.7166473529, issue_km: 0.1749277202 }];

describe('<Table>', () => {
    it('check if table renders properly', () => {
        const { container } = render(<Table columns={columns} data={customData} />);

        expect(container.querySelectorAll('tbody tr').length).toBe(4);
        expect(container.querySelector('table')).toHaveStyle("width: 100%;");
    });

    it('checks if the column sorting is working', () => {
        const { container } = render(<Table columns={columns} data={customData}
            initialSortBy={{ id: 'release', desc: false }} />);

        // initial sorting applied on release column
        const releaseCol = container.querySelectorAll('thead th')[0];
        expect(releaseCol.innerHTML).toBe("RELEASE<svg></svg>");

        // sorting is not applied on count column
        const countCol = container.querySelectorAll('thead th')[1];
        expect(countCol.innerHTML).not.toBe("COUNT<svg></svg>");

        // sorting is applied on count column on click event
        fireEvent.click(countCol);
        expect(countCol.innerHTML).toBe("COUNT<svg></svg>");
    });

    it('check if message is displayed properly when data is not present', () => {
        const { container } = render(<Table columns={columns} data={[]} noDataMessage='No data found' />);

        expect(container.innerHTML).toContain('No data found');

    });
});
