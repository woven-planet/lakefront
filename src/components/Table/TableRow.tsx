import { FC, Fragment, ReactNode, useState } from 'react';
import ContextMenu from '../ContextMenu';
import { RowHoverContext } from './RowHoverContext';
import { ContextMenuConfig } from './Table';

export interface TableRowProps {
    row: any;
    rowProps?: object;
    renderRowSubComponent?: ({ row }: { row: any }) => ReactNode;
    contextMenuConfig?: ContextMenuConfig;
}

const TableRow: FC<TableRowProps> = ({ row, rowProps, renderRowSubComponent, contextMenuConfig }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Get the menu items for this specific row
    const menuItems = contextMenuConfig?.getRowMenuItems(row) ?? [];

    // Determine the correct wrapper component for the row
    const RowWrapper = menuItems.length > 0 ? ContextMenu : 'tr';

    // Define the props for the wrapper. If it's the ContextMenu,
    // we need to pass the 'wrapper' prop to it.
    const wrapperProps = {
        ...(menuItems.length > 0 && { menuItems, wrapper: 'tr' }),
        ...row.getRowProps(rowProps),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    return (
        <RowHoverContext.Provider value={isHovered}>
            <Fragment key={row.id}>
                <RowWrapper {...wrapperProps}>
                    {row.cells.map((cell: any) => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                </RowWrapper>
                {row.isExpanded && renderRowSubComponent ? renderRowSubComponent({ row }) : null}
            </Fragment>
        </RowHoverContext.Provider>
    );
};

export default TableRow;
