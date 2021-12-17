
import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BreadCrumbComponent, { BreadcrumbProps } from 'src/Breadcrumb';
import DocBlock from '.storybook/DocBlock';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Lakefront/Breadcrumb',
    component: BreadCrumbComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<BreadcrumbProps & ComponentPropsWithoutRef<'div'>> = (args) => {

    return (
        <MemoryRouter>
            <BreadCrumbComponent routes={args.routes} />
        </MemoryRouter>
    );
};

export const Breadcrumb = Template.bind({});
Breadcrumb.args = {
    routes: [
        { name: 'Overview', url: '/Overview' },
        { name: 'Details', url: '/Details' },
        { name: 'Detail Overview', url: '/Details/DetailsOverview' },
    ]
};
