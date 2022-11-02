import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { SelectPopoverItem, StyledSelectPopover, StyledSelectPopoverWrapper } from './selectPopoverStyles';
import { createPortal } from 'react-dom';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';

export interface SelectPopoverOption {
    name: ReactElement | string;
    value: unknown;
    key?: string;
    disabled?: boolean;
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
     * so it doesn't get cut off. Uses IntersectionObserver and needs a polyfill if IE compatibility is needed.
     */
    renderInPortal?: boolean;
    /**
     * The classes to pass to the select popover.
     */
    className?: string;
}

/**
 * Select Popover Component
 *
 * The Select Popover component is a select-style component that displays like a popover at the bottom of the children.
 * The state is not managed inside this component and visible needs to be maintained in the parent component.
 * When used inside a scrollable or "overflow: hidden" element it may get cut off. When this is an issue,
 * use the "renderInPortal" prop which appends a div to the body and positions the component to the correct coordinates.
 *
 */
const SelectPopover: FC<SelectPopoverProps> = (
    {
        children,
        options,
        handleClick,
        renderInPortal = false,
        visible = false,
        className
    }) => {
    const [portal, setPortal] = useState<HTMLElement | null>(null);
    const [popoverElement, setPopoverElement] = useState<HTMLElement | null>(null);
    const [update, setUpdate] = useState<number>(0);

    useEffect(() => {
        const bodyElementHTMLCollection = document.getElementsByTagName('body');
        const bodyElement = bodyElementHTMLCollection.length > 0 ? bodyElementHTMLCollection.item(0) : null;
        let observer: IntersectionObserver;
        let portalElement: HTMLElement;

        if (renderInPortal && bodyElement) {
            portalElement = document.createElement('div');

            if (!portal) {
                bodyElement.appendChild(portalElement);
            }

            if (!portal && popoverElement) {
                observer = new IntersectionObserver(
                    () => {
                        setUpdate(new Date().getTime());
                    }
                );

                observer.observe(popoverElement);
                setPortal(portalElement);
            }
        }

        return () => {
            if (popoverElement && observer) {
                observer.unobserve(popoverElement);
            }

            if (portalElement && bodyElement && bodyElement.contains(portalElement)) {
                bodyElement.removeChild(portalElement);
            }
        };
    }, [popoverElement, renderInPortal]);

    useEffect(() => {
        if (popoverElement && portal) {
            const { left, bottom, width } = popoverElement.getBoundingClientRect();

            portal.style.position = 'absolute';
            portal.style.left = `${left + (width / 2)}px`;
            portal.style.top = `${bottom + window.scrollY}px`;
        }
    }, [update]);

    const popoverNodeMounted = (node: HTMLDivElement) => {
        setPopoverElement(node);
    };

    const popover = useMemo(
      () => (
        <>
          {visible && options.length > 0 && (
            <StyledSelectPopover>
              {options.map(({ name, value, key, disabled }) => (
                <SelectPopoverItem
                  key={key ?? name.toString()}
                  onClick={() => !disabled && handleClick(value)}
                  disabled={disabled}
                >
                  {name}
                </SelectPopoverItem>
              ))}
            </StyledSelectPopover>
          )}
        </>
      ),
      [children, options]
    );

    return (
        <ThemeProvider theme={theme}>
            <StyledSelectPopoverWrapper ref={popoverNodeMounted} className={className}>
                {children}
                {
                    portal ? (
                        createPortal(popover, portal)
                    ) : (
                        popover
                    )
                }
            </StyledSelectPopoverWrapper>
        </ThemeProvider>
    );
};

export default SelectPopover;
