import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button from 'src/Button/Button';
import RefreshToolbar from '../RefreshToolbar';

describe('<RefreshToolbar />', () => {
    let count = 0;
    let refreshing = false;
    const handleRefresh = () => {
        refreshing = true;
        count += 1;
    };

    it('renders button as correctly-styled icon', () => {
        const { container } = render((
            <RefreshToolbar
                handleRefresh={handleRefresh}
                isRefreshing={refreshing}
                refreshProgressLabel="Loading..."
                refreshTooltipText="Refresh LogSync File Details"
            />
        ));

        expect(container).toMatchSnapshot();
    });

    it('renders tooltip on hover', () => {
        const { container } = render((
            <RefreshToolbar
                handleRefresh={handleRefresh}
                isRefreshing={refreshing}
                refreshProgressLabel="Loading..."
                refreshTooltipText="Refresh LogSync File Details"
            />
        ));

        fireEvent.mouseOver(container.querySelector('button'));

        expect(container).toMatchSnapshot();
    });

    it('calls the refresh callback', () => {
        const { container } = render((
            <RefreshToolbar
                handleRefresh={handleRefresh}
                isRefreshing={refreshing}
                refreshProgressLabel="Loading..."
                refreshTooltipText="Refresh LogSync File Details"
            />
        ));

        fireEvent.click(container.querySelector('button'));

        expect(count).toBe(1);
        expect(refreshing).toBeTruthy();
    });

    it('renders custom refresh button', () => {
        const refreshButton = <Button color='primary' icon={true}></Button>;
        const { container } = render((
            <RefreshToolbar
                handleRefresh={handleRefresh}
                isRefreshing={refreshing}
                refreshProgressLabel="Loading..."
                refreshTooltipText="Refresh LogSync File Details"
                refreshButton={refreshButton}
            />
        ));

        expect(container.getElementsByClassName('iconChild')).toBeDefined();
    });

    it('renders right side text', () => {
        const { container, debug } = render((
            <RefreshToolbar
                handleRefresh={() => null}
                refreshTooltipText="Refresh LogSync File Details"
                lastUpdated="11:28:22 AM"
                rightSideText="Last Updated: 11:28:22 AM EST"
            />
        ));
        expect(container).toHaveTextContent('Last Updated: 11:28:22 AM EST');
    });

});
