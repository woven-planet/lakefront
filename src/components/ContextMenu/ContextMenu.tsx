import { FC, ReactNode, useRef, useState, useEffect, MouseEvent } from 'react';
import { useTheme, Theme } from '@emotion/react';
import { MenuContainer, MenuItemElement, Separator } from './contextMenuStyles';

// --- Type Definitions ---

export interface MenuItem {
    /** The text to display for the menu item. */
    label: string;
    /** A function to call when the item is clicked. */
    onClick: () => void;
    /** An optional React node to display as an icon. */
    icon?: ReactNode;
    /** If true, renders a separator instead of a clickable item. */
    isSeparator?: boolean;
    /** If true, the item will be visually disabled. */
    disabled?: boolean;
}

export interface ContextMenuProps {
    /** The content that will trigger the context menu on right-click. */
    children: ReactNode;
    /** An array of menu item objects to be displayed. */
    menuItems: MenuItem[];
}

// --- Component ---

/**
 * A component that attaches a customizable context menu to its children.
 * The menu is triggered by a right-click event.
 */
export const ContextMenu: FC<ContextMenuProps> = ({ children, menuItems }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    // --- Event Handlers ---

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

    /**
     * Closes the context menu.
     */
    const handleCloseMenu = () => {
        setIsVisible(false);
    };

    /**
     * Handles clicks on individual menu items.
     */
    const handleMenuItemClick = (itemOnClick: () => void) => {
        itemOnClick();
        handleCloseMenu();
    };

    // --- Effects ---

    /**
     * Effect to handle clicks outside of the context menu to close it.
     */
    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
                handleCloseMenu();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        <div onContextMenu={handleContextMenu}>
            {children}
            {isVisible && (
                <div ref={contextMenuRef}>
                    <MenuContainer top={position.y} left={position.x} theme={theme}>
                        {menuItems.map((item, index) =>
                            item.isSeparator ? (
                                <Separator key={`separator-${index}`} theme={theme}/>
                            ) : (
                                <MenuItemElement
                                    key={item.label}
                                    onClick={() => !item.disabled && handleMenuItemClick(item.onClick)}
                                    theme={theme}
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
