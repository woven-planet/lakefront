import React, { useEffect } from 'react';
import { useTable, useSortBy, useExpanded, TableState, Column } from 'react-table';
import { ReactComponent as ArrowUp } from './assets/arrow_drop_up.svg';
import { ReactComponent as ArrowDown } from './assets/arrow_drop_down.svg';
import { TableStyle } from './tableStyles';

interface SortByOptions {
    id: string;
    desc: boolean;
}

export interface TableProps {
    /**
     * This is to set the data for the table.
     */
    data: Array<any>;
    /**
     * This is to set the columns of the table.
     */
    columns: Array<Column>;
    /**
     * This is to set the additional properties on the table like disableSortRemove, 
     * autoResetSortBy, disableMultiSort, etc.
     */
    options?: any;
    /**
     * This is to set the row properties.
     */
    rowProps?: any;
    /**
     * This is to set the display message when there is no data.
     */
    noDataMessage?: string;
    /**
     * This is to set some additional style on the table.
     */
    style?: any;
    /**
     * This is to set a class on the table.
     */
    className?: string;
    /**
    * This is to set the initial sorting on the table.
    */
    initialSortBy?: { id: string; desc: boolean };
    /**
     * This event is triggered when the sorting is changed on the table.
     */
    onChangeSort?({ id, desc }: { id: string, desc: boolean }): void;
    /**
     * This is to set the row sub component on the table.
     */
    renderRowSubComponent?({ row }: { row: any }): React.ReactNode;
}

type CustomTableOptions = TableState<object> & { sortBy: SortByOptions[] }

/**
 *  The Table Component is used to render table with specified columns and data.
 *  The no data meesage can be set when the data is not present.
 *  You can set initial sorting on the table. OnChangeSort is triggered everytime the sorting is changed on the table.
 */
const Table: React.FC<TableProps> = ({ className,
    columns,
    data,
    options = {},
    noDataMessage = 'No data available',
    style,
    onChangeSort,
    initialSortBy,
    rowProps,
    renderRowSubComponent }) => {

    // Use the state and functions returned from useTable to build your UI
    const tableHookOptions = {
        ...options,
        columns,
        data
    };
    if (initialSortBy) tableHookOptions.initialState = { sortBy: [initialSortBy] };
    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        ...rest
    } = useTable(tableHookOptions, useSortBy, useExpanded);
    const { sortBy } = state as CustomTableOptions;

    useEffect(() => {
        if (onChangeSort && sortBy.length) {
            onChangeSort(sortBy[0]);
        }
    }, [sortBy]);

    // Render the UI for your table
    return (
        <TableStyle {...getTableProps()} className={className} style={style}>
            <thead>
                {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {column.isSorted && (
                                    <>{(column.isSortedDesc ? <ArrowDown /> : <ArrowUp />)}</>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row: any) => {
                    prepareRow(row);
                    return (
                        <React.Fragment key={row.id}>
                            <tr {...row.getRowProps(rowProps)}>
                                {row.cells.map((cell: any) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                            {row.isExpanded && renderRowSubComponent ? (renderRowSubComponent({ row })) : null}
                        </React.Fragment>
                    );
                })}
                {rows.length === 0 && <tr><td colSpan={columns.length}>{noDataMessage}</td></tr>}
            </tbody>
        </TableStyle>
    );
};

export default Table;
