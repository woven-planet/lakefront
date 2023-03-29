import { FC, ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { StyledPage } from './pageStyles';
import theme from 'src/styles/theme';

export interface PageProps {
    /**
     * The children to display within the styled page container.
     */
    children?: ReactNode;
    /**
     * These are the classes that would be applied to the Page component.
     */
    className?: string;
}

/**
 * Page Component
 * 
 * The Page Component can be used to render other child components.
 */
const Page: FC<PageProps> = ({ children, className }) => {
    return ( 
        <ThemeProvider theme={theme}>
            <StyledPage className={className}>
                {children}
            </StyledPage>
        </ThemeProvider>
    );
};

export default Page;
