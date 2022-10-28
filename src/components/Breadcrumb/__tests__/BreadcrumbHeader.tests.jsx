import React from 'react';
import { render } from '@testing-library/react';
import BreadcrumbHeader from '../BreadcrumbHeader';
import { BrowserRouter } from 'react-router-dom';

describe('<BreadcrumbHeader />', () => {
    it('renders a single route just fine', () => {
        const routes = [
            {
                name: 'Page',
                url: '/Page'
            }
        ];

        const { container } = render(<BrowserRouter><BreadcrumbHeader routes={routes}
            standalone={true} /></BrowserRouter>);
        expect(container.querySelectorAll('nav')[0]).toHaveTextContent('Page');
        expect(container.querySelectorAll('div')[0]).toHaveStyle('border-bottom: 1px solid');
        expect(container.querySelectorAll('div')[0]).toHaveStyle('padding: 0 3.5rem');
    });

    it('renders no routes when hideRoutes is set to true', () => {
        const routes = [
            {
                name: 'Page',
                url: '/Page'
            }
        ];

        const { container } = render(<BrowserRouter><BreadcrumbHeader routes={routes}
            standalone={true} hideRoutes={true} /></BrowserRouter>);
        expect(container.querySelectorAll('nav')[0]).not.toHaveTextContent('Page');
    });

    it('renders a custom header', () => {
        const routes = [
            {
                name: 'Page',
                url: '/Page'
            }
        ];

        const { container } = render(<BrowserRouter><BreadcrumbHeader routes={routes}
            standalone={true} hideRoutes={true} ><h2>Test Header</h2></BreadcrumbHeader></BrowserRouter>);
        expect(container).toHaveTextContent('Test Header');
    });
});
