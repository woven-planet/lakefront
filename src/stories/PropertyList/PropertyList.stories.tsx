
import { ComponentPropsWithoutRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PropertyListComponent, { PropertyListProps, Property } from 'src/PropertyList';
import DocBlock from '.storybook/DocBlock';
export default {
    title: 'Lakefront/PropertyList',
    component: PropertyListComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const attributes: Property[] = [
    { caption: 'P1', content: d => d.p1 },
    { caption: 'P2', content: d => d.p2 }
]

const data = {
    p1: 'content 1',
    p2: 'content 2'
};


const Template: Story<PropertyListProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    return (
        <PropertyListComponent {...args} />
    );
};

export const PropertyList = Template.bind({});
PropertyList.args = {
    attributes: attributes,
    data: data
};

export const PropertyListLeftAlign = Template.bind({});
PropertyListLeftAlign.args = {
    attributes: attributes,
    data: data,
    variant: 'left-align'
};
