import { ComponentPropsWithoutRef, useState, useEffect, useRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import MaskableImageComponent, { MaskableImageProps } from 'src/MaskableImage'
import DocBlock from '.storybook/DocBlock';

export default {
    title: 'Lakefront/MaskableImage',
    component: MaskableImageComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<MaskableImageProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    return (
        <MaskableImageComponent url={args.url}
            fullSizeDimensions={args.fullSizeDimensions} selectable={args.selectable} selected={args.selected}
            highlighted={args.highlighted} showSpinner={args.showSpinner} showSpinnerOnLoad={args.howSpinnerOnLoad}
            heightToWidthRatio={args.heightToWidthRatio} />
    );
};

export const MaskableImage = Template.bind({});
MaskableImage.args = {
    url: '',
    fullSizeDimensions: { height: '1px', width: '2px' },
    selectable: true,
    selected: false,
    highlighted: false,
    showSpinner: false,
    showSpinnerOnLoad: true,
    heightToWidthRatio: 10 / 16
}
