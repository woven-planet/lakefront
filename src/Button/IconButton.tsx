import React from 'react';
import { FC } from 'react';

export interface IconButtonProps {
    iconElement: SVGElement;
    position?: 'left' | 'right';
}

/**
 * Icon Component
 *
 * The Icon component takes name, an optional tooltip, and an optional position.
 * The name, which defaults to 'help', determines which icon to display along side any
 * provided children. If provided, the tooltip will cause the provided text to be displayed
 * when hovering over the button. The position, which defaults to 'left', determines if
 * the icon precedes or proceeds the provided children.
 *
 */
const IconButton: FC<IconButtonProps> = ({ iconElement, children, position }) => {

    const components = [iconElement, children];

    if (position === 'right') {
        components.reverse();
    }

    const [firstComponent, secondComponent] = components;

    return (
        <>
            {firstComponent}
            {secondComponent}
        </>
    );
};

export default IconButton;
