import StatusTable from '../StatusTable';
import StatusRow, { Status } from '../StatusRow';
import StatusCellBadge from '../StatusCellBadge';
import { createRoot } from 'react-dom/client';

const mockTableHeaders = [
    {
        name: 'First',
        field: 'first',
        sortable: true
    },
    {
        name: 'Second',
        field: 'second',
        sortable: false
    }
];

describe('<StatusTable />', function () {
    it('should render properly', () => {
        // const container = document.getElementById('root' || 'docs-root');
        // const container = document.getElementById('app-root-dir');
        const container = document.getElementById('app');
        const root = createRoot(container!);
        root.render(
            <StatusTable headers={mockTableHeaders} handleSort={jest.fn()}>
                <StatusRow status={Status.RUNNING}>
                    <td>First</td>
                    <td><StatusCellBadge status={'RUNNING'} /></td>
                </StatusRow>
                <StatusRow status={Status.ENQUEUED}>
                    <td>First</td>
                    <td><StatusCellBadge status={'ENQUEUED'} /></td>
                </StatusRow>
                <StatusRow status={Status.FAILED}>
                    <td>First</td>
                    <td><StatusCellBadge status={'FAILED'} /></td>
                </StatusRow>
                <StatusRow>
                    <td>First</td>
                    <td><StatusCellBadge status={'FINISHED'} /></td>
                </StatusRow>
                <StatusRow status={Status.NONE}>
                    <td>First</td>
                    <td><StatusCellBadge status={'NONE'} /></td>
                </StatusRow>
            </StatusTable>
        );

        expect(container).toMatchSnapshot();
    });
});
