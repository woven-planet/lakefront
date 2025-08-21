import { FC, Fragment, ReactNode, useState } from 'react';
import ContextMenu from '../ContextMenu';
import { ContextMenuConfig, MoreActionsConfig } from './Table';
import MoreActionsButton from '../MoreActionsButton/MoreActionsButton';

export interface TableRowProps {
    row: any;
    rowProps?: object;
    renderRowSubComponent?: ({ row }: { row: any }) => ReactNode;
    contextMenuConfig?: ContextMenuConfig;
    moreActionsConfig?: MoreActionsConfig;
}

const TableRow: FC<TableRowProps> = ({ row, rowProps, renderRowSubComponent, contextMenuConfig, moreActionsConfig }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Get the menu items for this specific row
    const menuItems = contextMenuConfig?.getRowMenuItems(row) ?? [];
    const actionItems = moreActionsConfig?.getRowActionItems(row) ?? [];

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

    // More Actions Button is visible if the feature is turned off, OR if the feature is on AND the row is hovered.
    const isButtonVisible = !moreActionsConfig?.visibleOnHover || isHovered;

    return (
        <Fragment key={row.id}>
            <RowWrapper {...wrapperProps}>
                {row.cells.map((cell: any) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
                {actionItems.length > 0 && (
                    <td>
                        {isButtonVisible && <MoreActionsButton items={actionItems} />}
                    </td>
                )}
            </RowWrapper>
            {row.isExpanded && renderRowSubComponent ? renderRowSubComponent({ row }) : null}
        </Fragment>
    );
};

export default TableRow;
