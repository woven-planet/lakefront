import { render, fireEvent, cleanup } from '@testing-library/react';

import Table from '../Table';

afterAll(cleanup);

const columns = [
    {
        Header: 'TITLE',
        accessor: 'title',
        Cell: ({ cell: { value } }) => value
    },
    {
        Header: 'VALUE',
        accessor: 'value'
    },
    {
        Header: 'PERCENTAGE',
        accessor: 'percentage'
    },
    {
        Header: 'PERCENTAGE CHANGE',
        accessor: 'percentage_change',
        Cell: ({ cell: { value } }) => value?.toFixed(4) || ''
    },
    {
        Header: 'TOTAL/100',
        accessor: 'total',
        Cell: ({ cell: { value } }) => value?.toFixed(4) || ''
    }
];
const customData = [{ title: 'r2204_1_0', value: 24, percentage: 166.992, percentage_change: 6.9579999999, total: 0.14371985 },
{ title: 'r2002_1_0', value: 3, percentage: 47.442, percentage_change: 15.814, total: 0.063491 },
{ title: 'r2010_1_0', value: 5, percentage: 25.68, percentage_change: 5.136, total: 0.1947675 },
{ title: 'r2019_1_0', value: 51, percentage: 291.549, percentage_change: 5.7166473529, total: 0.1749277202 }]

describe('<Table>', () => {
    it('check if table renders properly', () => {
        const { container } = render(<Table columns={columns} data={customData} />);

        expect(container.querySelectorAll('tbody tr').length).toBe(4);
        expect(container.querySelector('table')).toHaveStyle("width: 100%;");
    });

    it('checks if the column sorting is working', () => {
        const { container } = render(<Table columns={columns} data={customData}
            initialSortBy={{ id: 'title', desc: false }} />);

        // initial sorting applied on release column
        const releaseCol = container.querySelectorAll('thead th')[0];
        expect(releaseCol.innerHTML).toBe("TITLE<svg></svg>");

        // sorting is not applied on count column
        const countCol = container.querySelectorAll('thead th')[1];
        expect(countCol.innerHTML).not.toBe("VALUE<svg></svg>");

        // sorting is applied on count column on click event
        fireEvent.click(countCol);
        expect(countCol.innerHTML).toBe("VALUE<svg></svg>");
    });

    it('check if message is displayed properly when data is not present', () => {
        const { container } = render(<Table columns={columns} data={[]} noDataMessage='No data found' />);

        expect(container.innerHTML).toContain('No data found');

    });
});
