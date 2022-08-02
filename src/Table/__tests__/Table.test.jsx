import { render, fireEvent, cleanup } from '@testing-library/react';
import Table from '../Table';

afterAll(cleanup);

const columns = [
    {
        Header: 'TITLE',
        accessor: 'title',
        width: 100,
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
{ title: 'r2012_1_0', value: 3, percentage: 47.442, percentage_change: 15.814, total: 0.063491 },
{ title: 'r2010_1_0', value: 5, percentage: 25.68, percentage_change: 5.136, total: 0.1947675 },
{ title: 'r2019_1_0', value: 51, percentage: 291.549, percentage_change: 5.7166473529, total: 0.1949277202 },
{ title: 'r2020_1_0', value: 31, percentage: 271.549, percentage_change: 5.7166473529, total: 0.1749277202 },
{ title: 'r2021_1_0', value: 41, percentage: 281.549, percentage_change: 5.7166473529, total: 0.1849277202 }];

describe('<Table>', () => {
    it('check if table renders properly', () => {
        const { container } = render(<Table columns={columns} data={customData} />);

        expect(container.querySelectorAll('tbody tr').length).toBe(6);
        expect(container.querySelector('table')).toHaveStyle('width: 100%;');
    });

    it('checks if the column sorting is working', () => {
        const mockHandleSort = jest.fn();
        const { container, getAllByRole } = render(<Table columns={columns} data={customData}
            initialSortBy={{ id: 'title', desc: false }} onChangeSort={mockHandleSort} />);

        // initial sorting applied on release column
        expect(getAllByRole('cell')[0].textContent).toBe('r2010_1_0');

        // sorting is not applied on percentage column
        const percentageChange = container.querySelectorAll('thead th')[3];
        expect(getAllByRole('cell')[3].textContent).toBe('5.1360');
        expect(getAllByRole('cell')[8].textContent).toBe('15.8140');
        expect(getAllByRole('cell')[13].textContent).toBe('5.7166');
        expect(getAllByRole('cell')[18].textContent).toBe('5.7166');
        expect(getAllByRole('cell')[23].textContent).toBe('5.7166');
        expect(getAllByRole('cell')[28].textContent).toBe('6.9580');

        // sorting is applied on percentage change column on click event
        fireEvent.click(percentageChange);
        expect(getAllByRole('cell')[3].textContent).toBe('5.1360');
        expect(getAllByRole('cell')[8].textContent).toBe('5.7166');
        expect(getAllByRole('cell')[13].textContent).toBe('5.7166');
        expect(getAllByRole('cell')[18].textContent).toBe('5.7166');
        expect(getAllByRole('cell')[23].textContent).toBe('6.9580');
        expect(getAllByRole('cell')[28].textContent).toBe('15.8140');

    });

    it('check if message is displayed properly when data is not present', () => {
        const { container } = render(<Table columns={columns} data={[]} noDataMessage='No data found' />);

        expect(container.innerHTML).toContain('No data found');

    });

    it('check if the tooltip on the header indicates that multiple sort criteria is possible by shift-clicking to add to the sort.', () => {
        const { container } = render(<Table columns={columns} data={customData}
            initialSortBy={{ id: 'title', desc: false }} />);

        expect(container.querySelectorAll('th')[0].title).toBe('Hold shift & click the column to add to multi-sort');
        expect(container.querySelectorAll('th')[1].title).toBe('Hold shift & click the column to add to multi-sort');
        expect(container.querySelectorAll('th')[2].title).toBe('Hold shift & click the column to add to multi-sort');
        expect(container.querySelectorAll('th')[3].title).toBe('Hold shift & click the column to add to multi-sort');
        expect(container.querySelectorAll('th')[4].title).toBe('Hold shift & click the column to add to multi-sort');

    });

    it('renders Title column with a width of 100px & all other columns with 150px', () => {
        const { getAllByRole } = render(<Table columns={columns} data={customData}
            initialSortBy={{ id: 'title', desc: false }} />);

        expect(getAllByRole('columnheader')[0].width).toBe('100');
        expect(getAllByRole('columnheader')[1].width).toBe('150');
        expect(getAllByRole('columnheader')[2].width).toBe('150');
        expect(getAllByRole('columnheader')[3].width).toBe('150');
        expect(getAllByRole('columnheader')[4].width).toBe('150');
    });

    it('calls the mockHandleSort function', () => {
        const mockHandleSort = jest.fn();
        render(<Table columns={columns} data={customData}
            initialSortBy={{ id: 'title', desc: false }} onChangeSort={mockHandleSort} />);

        expect(mockHandleSort).toHaveBeenCalledWith({ 'desc': false, 'id': 'title' }, [{ 'desc': false, 'id': 'title' }]);
    });

    it('accepts array of initalSortBy data ', () => {
        const mockHandleSort = jest.fn();
        render(<Table columns={columns} data={customData}
            initialSortBy={[{ id: 'value', desc: false }, { id: 'title', desc: true }, { id: 'percentage', desc: true }]} onChangeSort={mockHandleSort} />);

        expect(mockHandleSort).toHaveBeenCalledWith( {'desc': false, 'id': 'value'}, [{'desc': false, 'id': 'value'}, {'desc': true, 'id': 'title'}, {'desc': true, 'id': 'percentage'}]);
    });
});
