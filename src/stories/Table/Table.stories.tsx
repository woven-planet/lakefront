
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
{ release: 'r2019_1_0', unique_issues: 51, autonomous_km: 291.549, km_disengagement: 5.7166473529, issue_km: 0.1749277202 },
{ release: 'r2125_1_0', unique_issues: 39, autonomous_km: 175.199, km_disengagement: 4.4922282052, issue_km: 0.2226686241 },
{ release: 'r2018_1_0', unique_issues: 12, autonomous_km: 80.672, km_disengagement: 6.7266666, issue_km: 0.148750612 },
{ release: 'r2027_1_0', unique_issues: 83, autonomous_km: 275.087, km_disengagement: 3.314819277, issue_km: 0.3017716 },
{ release: 'r2016_1_0', unique_issues: 27, autonomous_km: 130.419, km_disengagement: 4.830333334, issue_km: 0.20705373 },
{ release: 'r2115_1_0', unique_issues: 18, autonomous_km: 97.505, km_disengagement: 5.41694444, issue_km: 0.1846059897 },
{ release: 'r1112_1_0', unique_issues: 22, autonomous_km: 113.747, km_disengagement: 5.17018182, issue_km: 0.193415712 },
{ release: 'r2110_1_0', unique_issues: 80, autonomous_km: 304.77, km_disengagement: 3.80969996, issue_km: 0.2625626 }];

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
    initialSortBy: { id: 'release', desc: false },
    noDataMessage: "No data found",
    options: {
        disableSortRemove: true,
        autoResetSortBy: true,
        disableMultiSort: true
    }
};
