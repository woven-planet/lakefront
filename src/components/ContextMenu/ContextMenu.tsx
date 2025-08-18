import { FC, ReactNode, useRef, useState, useEffect, MouseEvent } from 'react';
import { MenuContainer, MenuItemElement, Separator } from './contextMenuStyles';

type ClickableMenuItem = {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    isSeparator?: false;
    disabled?: boolean;
};

type SeparatorMenuItem = {
    isSeparator: true;
    label?: never;
    onClick?: never;
    icon?: never;
    disabled?: never;
};

export type MenuItem = ClickableMenuItem | SeparatorMenuItem;

export interface ContextMenuProps {
    /** The content that will trigger the context menu on right-click. */
    children: ReactNode;
    /** An array of menu item objects to be displayed. */
    menuItems: MenuItem[];
}

/**
 * A component that attaches a customizable context menu to its children.
 * The menu is triggered by a right-click event.
 */
export const ContextMenu: FC<ContextMenuProps> = ({ children, menuItems }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const contextMenuRef = useRef<HTMLDivElement>(null);

    /**
     * Handles the right-click event on the children wrapper.
     * It prevents the default browser menu and shows the custom one.
     */
    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();

        // Set position based on click coordinates
        setPosition({ x: event.clientX, y: event.clientY });
        setIsVisible(true);
    };

    const handleCloseMenu = () => {
        setIsVisible(false);
    };

    const handleMenuItemClick = (itemOnClick: () => void) => {
        itemOnClick();
        handleCloseMenu();
    };

    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
                handleCloseMenu();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        <div onContextMenu={handleContextMenu}>
            {children}
            {isVisible && (
                <div ref={contextMenuRef}>
                    <MenuContainer top={position.y} left={position.x}>
                        {menuItems.map((item, index) =>
                            item.isSeparator ? (
                                <Separator key={`separator-${index}`} />
                            ) : (
                                <MenuItemElement
                                    key={item.label}
                                    onClick={() => !item.disabled && handleMenuItemClick(item.onClick)}
                                    style={{ opacity: item.disabled ? 0.5 : 1, cursor: item.disabled ? 'not-allowed' : 'pointer' }}
                                >
                                    {item.icon && <span>{item.icon}</span>}
                                    {item.label}
                                </MenuItemElement>
                            )
                        )}
                    </MenuContainer>
                </div>
            )}
        </div>
    );
};

export default ContextMenu;
