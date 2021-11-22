import { ComponentPropsWithoutRef, useEffect, useState, useRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import RefreshToolbarComponent, { RefreshToolbarProps } from 'src/RefreshToolbar';
import Button from 'src/Button/Button';
import DocBlock from '.storybook/DocBlock';
import { emerald } from 'src/styles/lakefrontColors';

export default {
    title: 'Lakefront/RefreshToolbar',
    component: RefreshToolbarComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<RefreshToolbarProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [count, setCount] = useState(0);
    const [showBanner, setShowBanner] = useState(false);
    const refreshToolbarRef = useRef(null);
    const handleRefresh = () => {
        setCount(count => count + 1);
    };
    const resetCount = () => {
        setCount(0);
    }

    useEffect(() => {
        if (refreshToolbarRef.current) {
            setShowBanner(true);
        }

        const timer = setTimeout(() => {
            setShowBanner(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [count]);
    return (
        <div ref={refreshToolbarRef}>
            <div
                style={{
                    minHeight: 20,
                    backgroundColor: showBanner && emerald,
                    padding: 8,
                    margin: '8px 0',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                {showBanner && count > 0 && `Refresh clicked ${count} times.`}
                {showBanner && count === 0 && `Refresh counter reset to 0`}
            </div>
            <section style={{ display: 'inline-flex' }}>
                <RefreshToolbarComponent handleRefresh={handleRefresh} className={args.className}
                    standalone={args.standalone} isRefreshing={args.isRefreshing} lastUpdated={args.lastUpdated}
                    refreshProgressLabel={args.refreshProgressLabel}
                    rightComp={args.rightComp} rightSideText={args.rightSideText} refreshButton={args.refreshButton} />
                <Button color='secondary' onClick={resetCount} style={{ marginTop: '10px', marginLeft: '10px' }}>Reset</Button>
            </section>
        </div>
    );
};

export const RefreshToolbar = Template.bind({});
RefreshToolbar.args = {
    isRefreshing: false,
    refreshProgressLabel: "Loading...",
    refreshTooltipText: "Refresh LogSync File Details",
    lastUpdated: "11:28:22 AM",
    rightSideText: "Last Updated: 11:28:22 AM EST"
};
