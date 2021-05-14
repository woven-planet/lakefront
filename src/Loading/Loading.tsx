import React from 'react';
import { ReactComponent as SpinnerLogo } from './assets/tri_logo_monochrome.svg';
import { StyledLoadingContainer } from './loadingStyles';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';
export interface LoadingProps {
    /**
     * Determines if the component should rotate.
     */
    animated?: boolean;
    /**
     * The direction of the default animation.
     */
    spinDirection?: 'LEFT' | 'RIGHT';
    /**
     * Label position in relation to the SVG.
     */
    labelPosition?: 'BOTTOM' | 'RIGHT';
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
     * Viewbox specs for SVG component if not already present in the SVG.
     */
    viewBox?: string;
    /**
     * The SVG image to be shown when loading.
     */
    logo?: React.ElementType;
     /**
     * Additional styles.
     */
    className?: string;
}

const Loading: React.FC<LoadingProps> = (
    {
        animated = true,
        spinDirection = 'RIGHT',
        label,
        labelPosition = 'BOTTOM',
        height = 24,
        width = 24,
        logo,
        className,
        ...logoProps
    }) => {
    const Logo = logo ? logo : SpinnerLogo;
    return (
        <ThemeProvider theme={theme}>
            <StyledLoadingContainer
                className={className}
                animated={animated}
                spinDirection={spinDirection}
                labelPosition={labelPosition}
            >
                <Logo height={height} width={width} {...logoProps} />
                {
                    label && <div>{label}</div>
                }
            </StyledLoadingContainer>
        </ThemeProvider>
    );
};

export default Loading;
