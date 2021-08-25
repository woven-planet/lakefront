import { FC } from 'react';
import { DrawerState } from './drawerUtil';
import { DrawerContainer } from './drawerStyles';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import Button from 'src/Button/Button';
import { ReactComponent as CloseIcon } from './assets/closeIcon.svg';

export interface DrawerProps {
    open: boolean;
    onClose(): void;
    onDrawerSizeChange(): void;
    drawerState: DrawerState;
    width?: string;
    className?: string;
    toolbarClasses?: string;
}

// Usage: Place this next to a flex container that has flex: 1
const Drawer: FC<DrawerProps> = ({ children, className, open = false, onClose, width = '50%', toolbarClasses }) => {
    return (
        <ThemeProvider theme={theme}>
            <DrawerContainer className={className} width={width} open={open}>
                <div className="innerDrawerContainer">
                    <div className={toolbarClasses}>
                        <div>
                            <Button alternate className="closeIcon" aria-label="Close" onClick={onClose} icon={<CloseIcon />} />
                        </div>
                    </div>
                    {children}
                </div>
            </DrawerContainer>
        </ThemeProvider>
    );
};

export default Drawer;
