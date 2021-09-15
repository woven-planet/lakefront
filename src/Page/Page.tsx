import { FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { StyledPage } from './pageStyles';
import theme from 'src/styles/theme';

export interface PageProps {
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
const Page: FC<PageProps> = props => {
    const { children, className } = props;
    return ( 
        <ThemeProvider theme={theme}>
            <StyledPage className={className}>
                {children}
            </StyledPage>
        </ThemeProvider>
    );
}

export default Page;
