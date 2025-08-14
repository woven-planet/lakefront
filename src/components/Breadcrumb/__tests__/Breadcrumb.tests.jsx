import React from 'react';
import Breadcrumb from '../Breadcrumb';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme } from '../../../lib/testing';

describe('<Breadcrumb />', () => {
    it('renders a single route just fine', () => {
        const routes = [
            {
                name: 'Page',
                url: '/Page'
            }
        ];

        const { container } = renderWithTheme(<BrowserRouter><Breadcrumb routes={routes} /></BrowserRouter>);
        expect(container.querySelectorAll('nav')[0]).toHaveTextContent('Page');
    });

    it('can handle multiple routes', () => {
        const routes = [
            {
                name: 'Page',
                url: '/Page'
            },
            {
                name: 'Sub Page',
                url: '/Page/SubPage'
            }
        ];

        const { container } = renderWithTheme(<BrowserRouter><Breadcrumb routes={routes} /></BrowserRouter>);
        expect(container.querySelectorAll('nav')[0]).toHaveTextContent('Sub Page');
    });
});
