import { FC, useCallback, useEffect, useRef, useState } from 'react';
import BoundingBoxes from 'src/BoundingBoxes';
import Loading from 'src/Loading/Loading';
import resizeObserver from 'src/lib/hooks/resizeObserver.js';
import { MaskableImageContainer, MaskedImage, LoadingSpinner, DisplayImage, HighlightedImageStyle, CheckOutlinedIconStyle }
    from './maskableImageStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
export interface EpisodeImageTagProp {
    id: number;
    name: string;
    model: string;
    display_name: string;
    detector: string;
    bounding_box: {
        top_left_x: number;
        top_left_y: number;
        bottom_right_x: number;
        bottom_right_y: number;
        confidence: number;
    };
    items: {
        confidence: number;
        bbox: number[][];
    }[];
    color: string;
}

export interface MaskableImageProps {
    url: string;
    fullSizeDimensions: { height: number; width: number };
    alt?: string;
    selectable?: boolean;
    selected?: boolean;
    onSelect?(selected: boolean): void;
    highlighted?: boolean;
    boundingBoxTags?: EpisodeImageTagProp[];
    showSpinner?: boolean;
    showSpinnerOnLoad?: boolean;
    className?: string;
    heightToWidthRatio?: number;
    innerWidth?: number;
}

// This is the base64 for a 1x1 transparent pixel
const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const MaskableImage: FC<MaskableImageProps> = ({
    className,
    url,
    fullSizeDimensions,
    alt = '',
    selectable = false,
    selected = false,
    onSelect,
    highlighted = false,
    boundingBoxTags,
    showSpinner = false,
    showSpinnerOnLoad = false,
    heightToWidthRatio = 10 / 16,
    innerWidth
}) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [boundingBoxDimensions, setBoundingBoxDimensions] = useState<{ [key: string]: number }>({});
    const [hovered, setHovered] = useState<boolean>(false);
    const [individuallySelected, setIndividuallySelected] = useState<boolean>(false);
    const [allLoading, setAllLoading] = useState<boolean>(false);
    const [observedElement, setObservedElement] = useState(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleMouseEnter = () => {
        if (selectable) {
            setHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (selectable) {
            setHovered(false);
        }
    };

    const handleIndividualSelection = (event: any) => {
        event.stopPropagation();
        const selectedState = !individuallySelected;

        setIndividuallySelected(selectedState);
        onSelect && onSelect(selectedState);
    };

    const containerRef = useCallback((node) => {
        if (node && boundingBoxTags) {
            const { height, width } = node.getBoundingClientRect();
            setBoundingBoxDimensions({ height, width });
        }

        setAllLoading(showSpinner || (showSpinnerOnLoad && !imageLoaded));
    }, [imageLoaded, innerWidth, fullSizeDimensions, observedElement]);

    useEffect(() => {
        const resizeCallback = (entries: any) => {
            setObservedElement(entries);
        };
        const graphResizeObserver = resizeObserver(resizeCallback);
        graphResizeObserver.observe(imageRef.current as HTMLImageElement);

        return () => {
            graphResizeObserver.disconnect();
        };
    }, []);

    // Show a transparent pixel when loading so the image doesn't appear stale when loading new ones
    useEffect(() => {
        setImageLoaded(false);
        setAllLoading(showSpinner || (showSpinnerOnLoad && !imageLoaded));
    }, [url]);

    useEffect(() => {
        setIndividuallySelected(false);
    }, [selected]);

    // Swap the transparent pixel image for the real one once loaded
    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    // https://css-tricks.com/scaled-proportional-blocks-with-css-and-javascript/
    // const aspectRatioConstraint = { paddingBottom: `${heightToWidthRatio * 100}%` };

    return (
        <ThemeProvider theme={theme}>
            <MaskableImageContainer
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={containerRef}
                className={className}
                heightToWidthRatio={heightToWidthRatio * 100 + '%'}
            >
                {
                    boundingBoxTags && imageLoaded && !allLoading && (
                        <BoundingBoxes
                            activeBBox=""
                            boundingBoxItems={boundingBoxTags}
                            imageWidth={fullSizeDimensions.width}
                            imageHeight={fullSizeDimensions.height}
                            outputWidth={boundingBoxDimensions.width}
                            outputHeight={boundingBoxDimensions.height}
                        />
                    )
                }

                {
                    allLoading && (
                        <LoadingSpinner>
                            <Loading
                                animated
                                height={24}
                                label="Loading"
                                labelPosition="RIGHT"
                                width={24}
                            />
                        </LoadingSpinner>
                    )
                }
                <DisplayImage imageLoaded={imageLoaded} allLoading={allLoading} showSpinnerOnLoad={showSpinnerOnLoad}
                    src={transparentPixel} alt='Loading' />
                <MaskedImage
                    imageLoaded={imageLoaded}
                    allLoading={allLoading}
                    showSpinnerOnLoad={showSpinnerOnLoad}
                    onLoad={handleImageLoaded}
                    src={url}
                    alt={alt}
                    ref={imageRef}
                />

                <HighlightedImageStyle highlighted={highlighted} />
                <CheckOutlinedIconStyle onClick={handleIndividualSelection} selectable={selectable}
                    selected={selected} hovered={hovered} individuallySelected={individuallySelected} />
            </MaskableImageContainer>
        </ThemeProvider>
    );
};

export default MaskableImage;
