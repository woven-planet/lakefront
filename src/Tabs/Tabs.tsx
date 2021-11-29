import React from 'react';
import { TabBar, TabStyle } from './tabStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

export interface TabDef {
    key: string;
    caption: string;
}

export interface TabProps {
    /**
     * This is to set the options which has a key and a caption.
     */
    options: TabDef[];
    /**
     * This is to set the slected tab by default.
     */
    value: string;
    /**
     * This is an event which is called whenever a tab is clicked.
     */
    onChange(value: string): void;
    /**
     * This is to set a class on the tab component.
     */
    className?: string;
}

/**
 * The Tab Component is used to render multiple tabs. The onChange event is called whenever the user clicks a different tab.
 * The value will set the selection of the tab by default.
 */
const Tabs: React.FC<TabProps> = props => {
    const {
        options,
        value,
        onChange,
        className
    } = props;

    return (
        <ThemeProvider theme={theme}>
            <TabBar className={className}>
                {options.map(t =>
                    <TabStyle
                        key={t.key}
                        isSelected={t.key === value}
                        onClick={() => onChange(t.key)}
                    >
                        {t.caption}
                    </TabStyle>
                )}
            </TabBar>
        </ThemeProvider>
    );
};

export default Tabs;
