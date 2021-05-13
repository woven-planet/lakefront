import React from 'react';
import { ReactComponent as SpinnerLogo } from './tri_logo_monochrome.svg';
import { StyledLoadingContainer } from './loadingStyles';

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
     * Additional styles.
     */
    className?: string;

    viewbox?: string;

    logo?: React.ElementType;
}

const Loading: React.FC<LoadingProps> = ({ label, height = 24, width = 24, className, viewbox = '0 0 175 150', logo }) => {
    const Logo = logo ? logo : SpinnerLogo;
    return (
        <StyledLoadingContainer className={className}>
            <Logo viewbox={viewbox} height={height} width={width} />
            {
                label && <div>{label}</div>
            }
        </StyledLoadingContainer>
    );
};

export default Loading;
