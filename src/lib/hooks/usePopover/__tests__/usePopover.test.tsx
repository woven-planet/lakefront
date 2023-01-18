import { useState } from 'react';
import { act, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import usePopover from '..';
import { UsePopoverProps } from '../usePopover';
import * as usePopoverUtil from '../usePopoverUtil';

const TestComponent = (props: Omit<UsePopoverProps, 'popoverContainer'>) => {
    const [popoverContainer, setPopoverContainer] = useState<HTMLElement | null>(null);
    usePopover({ ...props, popoverContainer });

    const popoverContainerMounted = (node: HTMLDivElement) => {
        setPopoverContainer(node);
    };

    return <div id='original-content' ref={popoverContainerMounted}></div>;
};

let createObserverSpy: jest.SpyInstance;
let mockIntersectionObserver: IntersectionObserver;

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('04 Jan 2023 00:12:00 GMT').getTime());
});

beforeEach(() => {
    jest.clearAllMocks();

    mockIntersectionObserver = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        root: null,
        rootMargin: '0px 0px 0px 0px',
        thresholds: [],
        disconnect: () => null,
        takeRecords: () => [],
    };
    createObserverSpy = jest.spyOn(usePopoverUtil, 'createObserver').mockImplementation(() => mockIntersectionObserver);
});

afterAll(() => {
    jest.useRealTimers();
});

describe('usePopover', () => {
    it('is a function', () => {
        expect(typeof usePopover).toBe('function');
    });

    describe('when renderInPortal is true', () => {
        it('appends portal div if one does not already exist', () => {
            const { baseElement } = render(
                <TestComponent renderInPortal />
            );

            expect(baseElement.children).toHaveLength(2);
            expect(baseElement.querySelector('#lakefront-portal-container')).toBeInTheDocument();
        });

        it('assigns a portal id when provided', () => {
            const { baseElement } = render(
                <TestComponent renderInPortal portalId='my-custom-id' />
            );

            expect(baseElement.querySelector('#my-custom-id')).toBeInTheDocument();
        });

        it('assigns a portal id when provided', () => {
            const { baseElement } = render(
                <TestComponent renderInPortal portalId='my-custom-id' />
            );

            expect(baseElement.querySelector('#my-custom-id')).toBeInTheDocument();
        });

        describe('portal assignment', () => {
            it('does not observe, set portal, or set update when portal already exists with truthy popoverContainer', () => {
                const { result } = renderHook(() => usePopover({
                    renderInPortal: true,
                    popoverContainer: null
                }));

                expect(mockIntersectionObserver.observe).not.toHaveBeenCalled();
                expect(result.current.portal).toBeNull();
                expect(result.current.update).toBe(0);
            });

            it('observes, sets portal, and sets update when portal does not exist with truthy popoverContainer', () => {
                const { container } = render(<div/>);
                const { result } = renderHook(() => usePopover({
                    renderInPortal: true,
                    popoverContainer: container
                }));

                expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(container);
                expect(result.current.portal).not.toBeNull();
                expect(result.current.update).toBe(0);
            });
        });
    });
});
