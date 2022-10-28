
import { Children, ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BreadcrumbHeaderComponent, { BreadcrumbHeaderProps } from 'src/components/Breadcrumb';
import DocBlock from '.storybook/DocBlock';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Lakefront/Breadcrumb',
    component: BreadcrumbHeaderComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<BreadcrumbHeaderProps & ComponentPropsWithoutRef<'div'>> = (args) => {

    return (
        <MemoryRouter>
            <BreadcrumbHeaderComponent {...args} />
        </MemoryRouter>
    );
};

export const BreadcrumbHeaderStandalone = Template.bind({});
BreadcrumbHeaderStandalone.args = {
    routes: [
        { name: 'Overview', url: '/Overview' },
        { name: 'Details', url: '/Details' },
        { name: 'Detail Overview', url: '/Details/DetailsOverview' },
    ],
    standalone: true,
    hideRoutes: false
};


export const BreadcrumbHeader = Template.bind({});
BreadcrumbHeader.args = {
    routes: [
        { name: 'Overview', url: '/Overview' },
        { name: 'Details', url: '/Details' },
        { name: 'Detail Overview', url: '/Details/DetailsOverview' },
    ],
    standalone: false,
    hideRoutes: false
};

export const BreadcrumbHeaderCustom = Template.bind({});
BreadcrumbHeaderCustom.args = {
    routes: [
        { name: 'Overview', url: '/Overview' },
        { name: 'Details', url: '/Details' },
        { name: 'Detail Overview', url: '/Details/DetailsOverview' },
    ],
    standalone: true,
    hideRoutes: true,
    children: <h2>Test Header</h2>
};
