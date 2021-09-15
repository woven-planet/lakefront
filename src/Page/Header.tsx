import { FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { StyledHeader } from './pageStyles';
import theme from 'src/styles/theme';

const Header: FC = props =>
{
    const { children } = props;
    return ( 
        <ThemeProvider theme={theme}>
            <StyledHeader>
            {children}
            </StyledHeader>
        </ThemeProvider>
    );
}

export default Header;
