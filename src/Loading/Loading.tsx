import React from 'react';
import { ReactComponent as SpinnerLogo } from './assets/tri_logo_monochrome.svg';
import { StyledLoadingContainer } from './loadingStyles';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';
export interface LoadingProps {
    /**
     * The text that shows when loading.
     */
    label?: string;
    /**
     * The height of the loading image.
     */
    height?: number;
    /**
     * The width of the loading image.
     */
    width?: number;
    /**
     * Viewbox specs for loading icon.
     */
    viewbox?: string;
    /**
     * The icon to be shown when loading.
     */
    logo?: React.ElementType;
     /**
     * Additional styles.
     */
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({ label, height = 24, width = 24, className, viewbox = '0 0 175 150', logo }) => {
    const Logo = logo ? logo : SpinnerLogo;
    return (
        <ThemeProvider theme={theme}>
            <StyledLoadingContainer className={className}>
                <Logo viewbox={viewbox} height={height} width={width} />
                {
                    label && <div>{label}</div>
                }
            </StyledLoadingContainer>
        </ThemeProvider>
    );
};

export default Loading;
