import React, { ComponentProps, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useExpanded, TableState, Column, TableSortByToggleProps } from 'react-table';
import { HideableTHead, StyledHeader, StyledHeaderContent, TableStyle } from './tableStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import { getSortBySVG, getTitleForMultiSort } from './tableUtil';
import { MenuItem } from '../ContextMenu';
import TableRow from './TableRow';
import { ActionMenuItem } from '../MoreActionsButton/MoreActionsButton';

export interface TableSortByOptions {
    id: string;
    desc: boolean;
}

export interface ContextMenuConfig {
    getRowMenuItems: (row: any) => MenuItem[];
}

export interface MoreActionsConfig {
    getRowActionItems: (row: any) => ActionMenuItem[];
    visibleOnHover?: boolean;
}

export interface TableProps {
    /**
     * This is to set the data for the table.
     */
    data: Array<any> | null | undefined;
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
    rowProps?: ComponentProps<'tr'>;
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
    * When an array of items is provided, the order dictates the priority of sorting. Example: value --> title --> percentage.
    */
    initialSortBy?: { id: string, desc: boolean}[] | { id: string, desc: boolean};

    /**
     * This event is triggered when the sorting is changed on the table.
     * The first argument is the sorted column and the second argument is the sortBy array
     * (for if table is sorted by multiple columns).
     */
    onChangeSort?({ id, desc }: TableSortByOptions, sortedBy?: TableSortByOptions[]): void;
    /**
     * This is to set the row sub component on the table.
     */
    renderRowSubComponent?({ row }: { row: any }): React.ReactNode;
    /**
     * This allows displaying the table rows without headers.
     * This is defaulted to false.
     */
    hideHeaders?: boolean;

    /**
     * Configuration for the row-level context menu.
     * If provided, a context menu will be enabled for each row.
     */
    contextMenuConfig?: ContextMenuConfig;

    moreActionsConfig?: MoreActionsConfig;
}

type CustomTableOptions = TableState<object> & { sortBy: TableSortByOptions[] }

/**
 *  The Table Component is used to render table with specified columns and data.
 *  The no data meesage can be set when the data is not present.
 *  You can set initial sorting on the table. OnChangeSort is triggered everytime the sorting is changed on the table.
 *  For more information about react-table please check the link https://react-table.tanstack.com/docs/api/useTable
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
    renderRowSubComponent,
    hideHeaders = false,
    contextMenuConfig,
    moreActionsConfig
}) => {
        /** initalSortBy must be memoized
         * https://react-table-v7.tanstack.com/docs/api/useSortBy#table-options
         */
        const initialSortByData = useMemo(
            () =>
                initialSortBy
                    ? { initialState: { sortBy: Array.isArray(initialSortBy) ? initialSortBy : [initialSortBy] } }
                    : {},
            [initialSortBy]
        );

        // Use the state and functions returned from useTable to build your UI
        const tableHookOptions = {
            ...options,
            columns,
            data,
            ...initialSortByData
        };
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, ...rest } = useTable(
            tableHookOptions,
            useSortBy,
            useExpanded
        );

        const { sortBy } = state as CustomTableOptions;

        useEffect(() => {
            if (onChangeSort && sortBy.length) {
                onChangeSort(sortBy[0], sortBy);
            }
        }, [sortBy]);

        // Render the UI for your table
        return (
            <ThemeProvider theme={theme}>
                <TableStyle {...getTableProps()} className={className} style={style}>
                    <HideableTHead hide={hideHeaders}>
                        {headerGroups.map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps((props: TableSortByToggleProps) => ({
                                                ...props,
                                                title: getTitleForMultiSort(
                                                    tableHookOptions.disableMultiSort,
                                                    props.title,
                                                    column.disableSortBy
                                                ),
                                                width: column.width
                                            }))
                                        )}
                                    >
                                        <StyledHeader>
                                            <StyledHeaderContent>{column.render('Header')}</StyledHeaderContent>
                                            <StyledHeaderContent>{getSortBySVG(column)}</StyledHeaderContent>
                                        </StyledHeader>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </HideableTHead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row: any) => {
                            prepareRow(row);
                            return (
                                <TableRow
                                    key={row.id}
                                    row={row}
                                    rowProps={rowProps}
                                    renderRowSubComponent={renderRowSubComponent}
                                    contextMenuConfig={contextMenuConfig}
                                    moreActionsConfig={moreActionsConfig}
                                />
                            );
                        })}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={columns.length}>{noDataMessage}</td>
                            </tr>
                        )}
                    </tbody>
                </TableStyle>
            </ThemeProvider>
        );
    };

export default Table;
