import { useEffect, useState } from 'react';
import { createObserver } from './usePopoverUtil';

export interface UsePopoverProps {
    /**
     * This is the container where the popover will reside
     * or must confirm exists (when rendering in a portal).
     */
    popoverContainer: HTMLElement | null;
    /**
     * This is the id to assign to the appended div when rendering in a portal.
     * This defaults to `lakefront-portal-container`.
     */
    portalId?: string;
    /**
     * When true, a div will be appended to the body in order to render the desired content through it.
     * This is useful when the content would be inside a scrollable container or one with "overflow: hidden"
     * so it doesn't get cut off. It uses IntersectionObserver and needs a polyfill if IE compatibility is needed. This
     * defaults to `false`.
     */
    renderInPortal?: boolean;
}

interface UsePopoverResult {
    portal: HTMLElement | null;
    update: number;
}

const usePopover = ({ popoverContainer, portalId, renderInPortal }: UsePopoverProps): UsePopoverResult => {
    const [portal, setPortal] = useState<HTMLElement | null>(null);
    const [update, setUpdate] = useState<number>(0);


    // renderInPortal setup
    useEffect(() => {
        const bodyElementHTMLCollection = document.getElementsByTagName('body');
        const bodyElement = bodyElementHTMLCollection.length > 0 ? bodyElementHTMLCollection.item(0) : null;
        let observer: IntersectionObserver;
        let portalElement: HTMLElement;

        if (renderInPortal && bodyElement) {
            portalElement = document.createElement('div');
            portalElement.id = portalId || 'lakefront-portal-container';

            if (!portal) {
                bodyElement.appendChild(portalElement);
            }

            if (!portal && popoverContainer) {
                observer = createObserver(() => {
                    setUpdate(new Date().getTime());
                });

                observer.observe(popoverContainer);
                setPortal(portalElement);
            }
        }

        return () => {
            if (popoverContainer && observer) {
                observer.unobserve(popoverContainer);
            }

            if (portalElement && bodyElement && bodyElement.contains(portalElement)) {
                bodyElement.removeChild(portalElement);
            }
        };
    }, [popoverContainer, renderInPortal]);

    // renderInPortal styling
    // useEffect

    return {
        portal,
        update
    };
};

export default usePopover;
