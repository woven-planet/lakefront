import React, { FC, useEffect, useMemo, useState } from 'react';
import { SelectPopoverItem, StyledSelectPopover, StyledSelectPopoverWrapper } from './selectPopoverStyles';
import { createPortal } from 'react-dom';

export interface SelectPopoverOption {
    name: string;
    value: unknown;
    key?: string;
}

export interface SelectPopoverProps {
    /**
     * Called on click with the value of the option that was clicked.
     */
    handleClick(value: unknown): void;
    /**
     * Options to be mapped to items in the dropdown.
     */
    options: SelectPopoverOption[];
    /**
     * Determines whether the popover is visible. A key can be provided if the name is not unique.
     */
    visible: boolean;
    /**
     * When true, the component will mount a div to the body and render the popover through it.
     * This is useful when the popover would be inside a scrollable container or one with "overflow: hidden"
     * so it doesn't get cut off.
     */
    renderInPortal?: boolean;
}

const SelectPopover: FC<SelectPopoverProps> = (
    {
        children,
        options,
        handleClick,
        renderInPortal = false,
        visible = false
    }) => {
    const [portal, setPortal] = useState<HTMLElement | null>(null);
    const [popoverElement, setPopoverElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const bodyElementHTMLCollection = document.getElementsByTagName('body');
        const bodyElement = bodyElementHTMLCollection.length > 0 ? bodyElementHTMLCollection.item(0) : null;

        if (renderInPortal && bodyElement) {
            const portalElement = document.createElement('div');

            if (!portal) {
                bodyElement.appendChild(portalElement);
            }

            if (popoverElement) {
                if (portal) {
                    const { left, bottom, width } = popoverElement.getBoundingClientRect();
                    portal.style.position = 'absolute';
                    portal.style.left = `${left + (width / 2)}px`;
                    portal.style.top = `${bottom + window.scrollY}px`;
                }
            }

            if (!portal) {
                setPortal(portalElement);
            }
        }

        return () => {
            if (portal && bodyElement) {
                bodyElement.removeChild(portal);
            }
        }
    }, [popoverElement]);

    const popoverNodeMounted = (node: HTMLDivElement) => {
        setPopoverElement(node);
    }

    const popover = useMemo(() => (
        <>
            {
                visible && (
                    <StyledSelectPopover>
                        {
                            options.map(({ name, value, key }) => (
                                <SelectPopoverItem key={key ?? name} onClick={() => handleClick(value)}>{name}</SelectPopoverItem>
                            ))
                        }
                    </StyledSelectPopover>
                )
            }
        </>
    ), [children, options]);

    return (
        <StyledSelectPopoverWrapper ref={popoverNodeMounted}>
            {children}
            {
                portal ? (
                    createPortal(popover, portal)
                ) : (
                    popover
                )
            }
        </StyledSelectPopoverWrapper>
    )
};

export default SelectPopover;
