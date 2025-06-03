import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import Button from 'src/components/Button/Button';
import TableComponent, { TableProps } from 'src/components/Table';
import DocBlock from '.storybook/DocBlock';
import styled from '@emotion/styled';
import { ReactComponent as ChevronUp } from 'src/components/Collapsible/assets/chevron-up.svg';
import { ReactComponent as ChevronDown } from 'src/components/Collapsible/assets/chevron-down.svg';
import lakefrontColors from 'src/styles/lakefrontColors';

export default {
    title: 'Lakefront/Table',
    component: TableComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

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

const columnsWithWidth = [
    {
        Header: 'TITLE',
        accessor: 'title',
        width: 100,
        Cell: ({ cell: { value } }) => value
    },
    {
        Header: 'VALUE',
        accessor: 'value',
        width: 100
    },
    {
        Header: 'PERCENTAGE',
        accessor: 'percentage',
        width: 100
    },
    {
        Header: 'PERCENTAGE CHANGE',
        accessor: 'percentage_change',
        width: 140,
        Cell: ({ cell: { value } }) => value?.toFixed(4) || ''
    },
    {
        Header: 'TOTAL/100',
        accessor: 'total',
        width: 50,
        disableSortBy: true,
        Cell: ({ cell: { value } }) => value?.toFixed(4) || ''
    }
];

const ChevronContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    svg: {
        stroke: lakefrontColors.black
    }
});

const columnsWithWidthAndExpander = [
    ...columnsWithWidth,
    {
        Header: '',
        id: 'expander',
        disableSortBy: true,
        Cell: ({ row }) => {
            return (
                <ChevronContainer {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? <ChevronUp /> : <ChevronDown />}
                </ChevronContainer>
            );
        }
    }
];

const customData = [{
    title: 'r2204_1_0',
    value: 24,
    percentage: 166.992,
    percentage_change: 6.9579999999,
    total: 0.14371985
},
    { title: 'r2002_1_0', value: 3, percentage: 47.442, percentage_change: 15.814, total: 0.063491 },
    { title: 'r2010_1_0', value: 5, percentage: 25.68, percentage_change: 5.136, total: 0.1947675 },
    { title: 'r2019_1_0', value: 51, percentage: 291.549, percentage_change: 5.7166473529, total: 0.1959277202 },
    { title: 'r2125_1_0', value: 39, percentage: 175.199, percentage_change: 4.4922282052, total: 0.2226686241 },
    { title: 'r2018_1_0', value: 12, percentage: 80.672, percentage_change: 6.7266666, total: 0.148750612 },
    { title: 'r2027_1_0', value: 83, percentage: 275.087, percentage_change: 3.314819277, total: 0.3017716 },
    { title: 'r2016_1_0', value: 27, percentage: 130.419, percentage_change: 4.830333334, total: 0.20705373 },
    { title: 'r2115_1_0', value: 18, percentage: 97.505, percentage_change: 5.7166473529, total: 0.1746059897 },
    { title: 'r1112_1_0', value: 22, percentage: 113.747, percentage_change: 5.7166473529, total: 0.193415712 },
    { title: 'r2110_1_0', value: 80, percentage: 304.77, percentage_change: 3.80969996, total: 0.2625626 }];

const initialSortByCustomData = [
    { title: 'car', value: 24, percentage: 166.992, percentage_change: 6.9579999999, total: 0.14371985 },
    { title: 'truck', value: 22, percentage: 304.77, percentage_change: 15.814, total: 0.063491 },
    { title: 'boat', value: 5, percentage: 25.68, percentage_change: 5.136, total: 0.1947675 },
    { title: 'car', value: 51, percentage: 291.549, percentage_change: 5.7166473529, total: 0.1959277202 },
    { title: 'boat', value: 51, percentage: 175.199, percentage_change: 4.4922282052, total: 0.2226686241 },
    { title: 'car', value: 12, percentage: 80.672, percentage_change: 6.7266666, total: 0.148750612 },
    { title: 'truck', value: 83, percentage: 275.087, percentage_change: 3.314819277, total: 0.3017716 },
    { title: 'truck', value: 51, percentage: 130.419, percentage_change: 4.830333334, total: 0.20705373 },
    { title: 'truck', value: 18, percentage: 97.505, percentage_change: 5.7166473529, total: 0.1746059897 },
    { title: 'car', value: 22, percentage: 113.747, percentage_change: 5.7166473529, total: 0.193415712 },
    { title: 'boat', value: 22, percentage: 47.442, percentage_change: 3.80969996, total: 0.2625626 }
];

const SubComponentTr = styled.tr({
    'td.table-wrapper-td': {
        padding: 0
    },
    boxShadow: '0px 4px 4px #F5F5F5'
});

const TableWrapperTd = styled.td({
    'td:first-of-type, td:last-of-type': {
        content: '""',
        display: 'block',
        margin: '0 auto 0 1em',
        borderBottom: `1px solid ${lakefrontColors.selago}`
    },
    'td:last-of-type': {
        margin: '0 1em 0 auto'
    }
});

const renderRowSubComponent = ({ row }) => {
    const { value, percentage, percentage_change, total } = row.original;
    const nestedData = [
        {
            title: 'halved',
            value: value / 2,
            percentage: percentage / 2,
            percentage_change: percentage_change / 2,
            total: total / 2
        },
        {
            title: 'doubled',
            value: 24 * 2,
            percentage: percentage * 2,
            percentage_change: percentage_change * 2,
            total: total * 2
        }
    ];

    const subColumns = [
        ...columnsWithWidthAndExpander
            .slice(0, columnsWithWidthAndExpander.length - 1),
        {
            Header: '',
            id: 'hiddenExpander',
            disableSortBy: true,
            Cell: () => <div>&nbsp;</div>
        }
    ];

    return (
        <SubComponentTr>
            <TableWrapperTd colSpan={columnsWithWidthAndExpander.length} className='table-wrapper-td'>
                <TableComponent
                    columns={subColumns}
                    data={nestedData}
                    renderRowSubComponent={renderRowSubComponent}
                    hideHeaders
                />
            </TableWrapperTd>
        </SubComponentTr>
    );
};

const StyledTableComponent = styled(TableComponent)({
    td: {
        fontWeight: 'bold'
    },
    table: {
        td: {
            fontWeight: 'normal'
        }
    }
});

const Template: StoryFn<TableProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [data, setData] = useState(args.data);
    const [dataToggle, setDataToggle] = useState(false);
    const [sortMsg, setSortMsg] = useState('');

    const resetData = () => {
        const newData = dataToggle ? customData : [];
        setData(newData);
        setDataToggle(dataToggle => !dataToggle);
    };

    const handleSort = (_, sortedBy) => {
        const newMsg = 'Sorting is applied on column name(s): ';
        const columnNamesAndSortDirection = sortedBy.map((sortedColumn) => {
            const colName = columns.find(col => col.accessor === sortedColumn.id).Header;
            const sortDirection = sortedColumn.desc ? '(Descending Order)' : '(Ascending Order)';
            return ` ${colName} ${sortDirection}`;
        });

        setSortMsg(`${newMsg} ${columnNamesAndSortDirection}`);
    };

    const RenderTableComponent = args.renderRowSubComponent ? StyledTableComponent : TableComponent;

    return (
        <>
            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                <Button color='secondary' onClick={resetData}>
                    {dataToggle ? 'Load Data' : 'Clear Data'}</Button><br /><br />
                {!dataToggle && <b>{sortMsg}</b>
                }
            </div>
            <RenderTableComponent {...args} data={data} onChangeSort={handleSort} />
        </>
    );
};

// initialSortBy one column
export const Table = Template.bind({});
Table.args = {
    columns: columns,
    data: customData,
    initialSortBy: { id: 'title', desc: false },
    noDataMessage: 'No data found',
    options: {
        disableSortRemove: true,
        autoResetSortBy: true,
        disableMultiSort: false
    }
};


// initialSortBy array of which columns to sort in order
export const TableWithInitialSortByArray = Template.bind({});
TableWithInitialSortByArray.args = {
    columns: columns,
    data: initialSortByCustomData,
    initialSortBy: [
        { id: 'value', desc: false },
        { id: 'title', desc: true },
        { id: 'percentage', desc: true }
    ],
    noDataMessage: 'No data found',
    options: {
        disableSortRemove: true,
        autoResetSortBy: true,
        disableMultiSort: false
    }
};

export const TableWithMultiSortDisabled = Template.bind({});
TableWithMultiSortDisabled.args = {
    columns: columns,
    data: customData,
    initialSortBy: { id: 'title', desc: false },
    noDataMessage: 'No data found',
    options: {
        disableMultiSort: true
    }
};

export const TableWithCustomWidth = Template.bind({});
TableWithCustomWidth.args = {
    columns: columnsWithWidth,
    data: customData,
    initialSortBy: { id: 'title', desc: false },
    noDataMessage: 'No data found',
    options: {
        disableMultiSort: false
    }
};

export const TableWithExpandableRows = Template.bind({});
TableWithExpandableRows.args = {
    columns: columnsWithWidthAndExpander,
    data: initialSortByCustomData,
    noDataMessage: 'No data found',
    renderRowSubComponent
};
