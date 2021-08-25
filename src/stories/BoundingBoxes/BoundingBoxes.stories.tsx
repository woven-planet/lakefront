import { ChangeEvent, ComponentPropsWithoutRef, useCallback, useEffect, useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import BoundingBoxesComponent, { BoundingBoxesProps } from 'src/BoundingBoxes';
import DocBlock from '.storybook/DocBlock';
import { emerald, mediumPurple, saturatedOrange, saturatedYellow } from 'src/styles/lakefrontColors';
import styled from '@emotion/styled';
import imageFile from './__assets__/ducks.jpg';
import resizeObserver from 'src/lib/hooks/resizeObserver';

const BOUNDING_BOXES: {
    name: string;
    items: {
        confidence: number;
        bbox: number[][];
    }[];
    color: string;
}[] = [
    {
        name: 'duck',
        items: [
            {
                confidence: 1,
                bbox: [
                    [1390, 280],
                    [1165, 25]
                ]
            }
        ],
        color: mediumPurple
    },
    {
        name: 'duck',
        items: [
            {
                confidence: 1,
                bbox: [
                    [1620, 590],
                    [1395, 335]
                ]
            }
        ],
        color: saturatedOrange
    },
    {
        name: 'duck',
        items: [
            {
                confidence: 1,
                bbox: [
                    [1070, 810],
                    [845, 555]
                ]
            }
        ],
        color: emerald
    },
    {
        name: 'duck',
        items: [
            {
                confidence: 1,
                bbox: [
                    [405, 900],
                    [190, 645]
                ]
            }
        ],
        color: saturatedYellow
    }
];

const StoryContainer = styled.div({
    width: '100%',
    minHeight: 320,
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        // intentional height over-adjustment helps contained content to fully fit width bounds for most 16:10 scenarios
        // (e.g. hide small pixel value background that shows because of rounding applied to scaled size)
        height: '100.5%',
        objectFit: 'contain'
    }
});

export default {
    title: 'Lakefront/BoundingBoxes',
    component: BoundingBoxesComponent,
    argTypes: {
        checked: {
            control: false
        },
        checkedIcon: {
            table: {
                disable: true
            }
        },
        onChange: {
            control: false
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            transformSource: (source: string) => {
                return source
                    .replace('onChange={function noRefCheck() {}}', '')
                    .replace(/\n/g, '')
                    .replace(/[ ]{2}/g, ' ');
            }
        }
    }
} as Meta;

const Template: Story<BoundingBoxesProps> = (args) => {
    const [boundingBoxDimensions, setBoundingBoxDimensions] = useState({ width: 1920, height: 1280 });
    // const [boundingBoxDimensions, setBoundingBoxDimensions] = useState<{ [key: string]: number }>({});
    const [imageLoaded, setImageLoaded] = useState(false);
    const [observedElement, setObservedElement] = useState(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const containerRef = useCallback(
        (node) => {
            if (node) {
                const { height, width } = node.getBoundingClientRect();
                setBoundingBoxDimensions({ height, width });
            }
        },
        [imageLoaded, observedElement]  
    );

    useEffect(() => {
        if (imageRef.current) {
            const resizeCallback = (entries) => {
                setObservedElement(entries);
            };
            const boxResizeObserver = resizeObserver(resizeCallback);

            boxResizeObserver.observe(imageRef.current as HTMLImageElement);

            return () => {
                boxResizeObserver.disconnect();
            };
        }
    }, [imageLoaded]);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    return (
        <StoryContainer ref={containerRef}>
            {imageLoaded && (
                <BoundingBoxesComponent
                    activeBBox=""
                    boundingBoxItems={BOUNDING_BOXES}
                    imageHeight={1280}
                    imageWidth={1920}
                    outputHeight={boundingBoxDimensions.height}
                    outputWidth={boundingBoxDimensions.width}
                />
            )}
            <img onLoad={handleImageLoaded} src={imageFile} ref={imageRef} />
        </StoryContainer>
    );
};

export const BoundingBoxes = Template.bind({});
BoundingBoxes.args = {};
