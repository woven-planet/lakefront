import { ElementType, FC, ReactElement } from 'react';
import { ReactComponent as SpinnerLogo } from './assets/tri_logo_monochrome.svg';
import { StyledLoadingContainer } from './loadingStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

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
     * The text or element that shows next to the svg.
     */
    label?: string | ReactElement;
    /**
     * The height of the loading image.
     */
    height?: number;
    /**
     * The width of the loading image.
     */
    width?: number;
    /**
     * The SVG image to be shown when loading.
     */
    svg?: ElementType;
     /**
     * Additional styles.
     */
    className?: string;
}

const Loading: FC<LoadingProps> = (
    {
        animated = true,
        spinDirection = 'RIGHT',
        label,
        labelPosition = 'BOTTOM',
        height = 24,
        width = 24,
        svg,
        className,
        ...logoProps
    }) => {
    const Svg = svg ? svg : SpinnerLogo;
    return (
        <ThemeProvider theme={theme}>
            <StyledLoadingContainer
                className={className}
                animated={animated}
                spinDirection={spinDirection}
                labelPosition={labelPosition}
            >
                <Svg height={height} width={width} {...logoProps} />
                {
                    label && <div>{label}</div>
                }
            </StyledLoadingContainer>
        </ThemeProvider>
    );
};

export default Loading;
