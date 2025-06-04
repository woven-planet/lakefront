import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';

import DrawerComponent, { DrawerProps } from 'src/components/Drawer';
import DocBlock from '.storybook/DocBlock';
import Button from 'src/components/Button/Button';
import { emerald } from 'src/styles/lakefrontColors';

export default {
    title: 'Lakefront/Drawer',
    component: DrawerComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: StoryFn<DrawerProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const drawerContainRef = useRef(null);

    useEffect(() => {
        if (!isOpen && drawerContainRef.current) {
            setShowBanner(true);
        }

        const timer = setTimeout(() => {
            setShowBanner(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [isOpen]);

    const handleOpenDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleOnClose = () => {
        handleOpenDrawer();
    };

    return (
        <div ref={drawerContainRef} style={{ overflowX: 'hidden' }}>
            <div
                style={{
                    minHeight: 20,
                    backgroundColor: showBanner && emerald,
                    padding: 8,
                    margin: '8px 0',
                    textAlign: 'center'
                }}
            >
                {showBanner && 'This notification was a notification hooked up to the onClose handler.'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleOpenDrawer}>{isOpen ? 'Close' : 'Open'} Drawer</Button>
            </div>
            <div style={{ display: 'flex', position: 'relative', marginTop: 8 }}>
                <div style={{ flex: 1 }} />
                <DrawerComponent {...args} open={isOpen} onClose={handleOnClose} width={isOpen ? '100%' : '50%'}>
                    <div style={{ minWidth: 40, minHeight: 40, color: 'white', textAlign: 'center' }}>
                        Drawer content can be added here.
                    </div>
                </DrawerComponent>
            </div>
        </div>
    );
};

export const Drawer = Template.bind({});
Drawer.args = {
    open: false
};
