import { FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { StyledPage } from './pageStyles';
import theme from 'src/styles/theme';

export interface PageProps {
    className?: string;
}


const Page: FC<PageProps> = props =>
{
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
