import { ChangeEvent, ComponentPropsWithoutRef, MouseEventHandler, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import BoundingBoxesComponent, { BoundingBoxesProps } from 'src/BoundingBoxes';
import DocBlock from '.storybook/DocBlock';
import { akoya, emerald, mediumPurple, pavement, saturatedOrange, saturatedYellow } from 'src/styles/lakefrontColors';
import styled from '@emotion/styled';
import imageFile from './__assets__/ducks.jpg';

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
                bbox: [[665, 130], [595, 25]]
            }
        ],
        color: mediumPurple
    },
    {
        name: 'duck',
        items: [
            {
                confidence: 1,
                bbox: [[780, 300], [710, 175]]
            }
        ],
        color: saturatedOrange
    },
    {
        name: 'duck',
        items: [
            {
                confidence: 1,
                bbox: [[505, 400], [435, 275]]
            }
        ],
        color: emerald
    },
    {
        name: 'duck',
        items: [
            {
                confidence: 1,
                bbox: [[185, 445], [110, 320]]
            }
        ],
        color: saturatedYellow
    }
];

// This is the base64 for a 1x1 transparent pixel
const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const StoryContainer = styled.div({
    width: '100%',
    minHeight: 320,
    backgroundColor: 'transparent',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
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
            },
        }
    }
} as Meta;

const Template: Story<BoundingBoxesProps> = (args) => {
    const [boundingBoxDimensions, setBoundingBoxDimensions] = useState({ width: 1920, height: 1280 });
    const [imageLoaded, setImageLoaded] = useState(false);

   // Swap the transparent pixel image for the real one once loaded
   const handleImageLoaded = () => {
    setImageLoaded(true);
    };

    return (
        <StoryContainer>
            {imageLoaded && (<BoundingBoxesComponent
            activeBBox=''
            boundingBoxItems={BOUNDING_BOXES}
            imageHeight={1920}
            imageWidth={1280}
            outputHeight={boundingBoxDimensions.width}
            outputWidth={boundingBoxDimensions.height}
        />)}
            <img
                onLoad={handleImageLoaded}
                src={imageFile}
            />
        </StoryContainer>
    );
};

export const BoundingBoxes = Template.bind({});
BoundingBoxes.args = {

};
