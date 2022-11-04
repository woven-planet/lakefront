import { FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { StyledHeader } from './pageStyles';
import theme from 'src/styles/theme';

interface HeaderProps {
    /**
     * The classes to pass to the header.
     */
    className?: string;
}

/**
 * Header Component
 * 
 * The Header component is used to render the header.
 */
const Header: FC<HeaderProps> = ({ children, className }) => {
    return ( 
        <ThemeProvider theme={theme}>
            <StyledHeader className={className}>
                {children}
            </StyledHeader>
        </ThemeProvider>
    );
};

export default Header;
