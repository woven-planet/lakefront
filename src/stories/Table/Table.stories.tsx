
import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Button from 'src/Button/Button';
import TableComponent, { TableProps } from 'src/Table';
import DocBlock from '.storybook/DocBlock';

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

const customData = [{ title: 'r2204_1_0', value: 24, percentage: 166.992, percentage_change: 6.9579999999, total: 0.14371985 },
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

const Template: Story<TableProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [data, setData] = useState(args.data);
    const [dataToggle, setDataToggle] = useState(false);
    const [sortMsg, setSortMsg] = useState('');

    const resetData = () => {
        const newData = dataToggle ? customData : [];
        setData(newData);
        setDataToggle(dataToggle => !dataToggle);
    }

    const handleSort = ({ id, desc }) => {
        const newMsg = 'Sorting is applied on column name: ' + columns.filter(col => col.accessor === id)[0].Header;
        const sortOrder = desc ? ' (Descending Order)' : ' (Ascending Order)';
        setSortMsg(newMsg + sortOrder);
    };

    return (
        <>
            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                <Button color='secondary' onClick={resetData}>
                    {dataToggle ? 'Load Data' : 'Clear Data'}</Button><br /><br />
                {!dataToggle && <b>{sortMsg}</b>
                }
            </div>
            <TableComponent {...args} data={data} onChangeSort={handleSort}>
            </TableComponent>
        </>
    );
};

export const Table = Template.bind({});
Table.args = {
    columns: columns,
    data: customData,
    initialSortBy: { id: 'title', desc: false },
    noDataMessage: "No data found",
    options: {
        disableSortRemove: true,
        autoResetSortBy: true,
        disableMultiSort: false
    }
};
