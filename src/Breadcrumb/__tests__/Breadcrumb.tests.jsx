import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';
import { BrowserRouter } from 'react-router-dom';

describe('<Breadcrumb />', () => {
    it('renders a single route just fine', () => {
        const routes = [
            {
                name: 'Pipeline Tasks',
                url: '/pipeline/tasks'
            }
        ];

        const { container } = render(<BrowserRouter><Breadcrumb routes={routes} /></BrowserRouter>);
        expect(container.querySelectorAll('nav').length).toBe(1);
    });

    it('can handle multiple routes', () => {
        const routes = [
            {
                name: 'Pipeline Tasks',
                url: '/pipeline/tasks'
            },
            {
                name: 'Adr Log Spam',
                url: '/pipeline/tasks/adr_log_spam'
            }
        ];

        const { container } = render(<BrowserRouter><Breadcrumb routes={routes} /></BrowserRouter>);
        expect(container.querySelectorAll('nav').length).toBe(1);
    });
});
