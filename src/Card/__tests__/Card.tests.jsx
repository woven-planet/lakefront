import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Card from '../Card'

describe('<Card />', () => {
    it('renders CardProps', () => {
        const { container, getByText } = render(
            <Card
                title='My Card'
                description='This is a card description.'
                content={<span>Span Content</span>}
                disabled={false}
                onClick={() => undefined}
            />);

        getByText('My Card');
        getByText('This is a card description.');
        getByText('Span Content');
        expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
        const click = jest.fn();
        const { container, getByText } = render(
            <Card
                title='My Card'
                description='This is a card description.'
                content={<span>Span Content</span>}
                disabled={false}
                onClick={click}
            />);

        const button = container.querySelector('button');
        await waitFor(() => fireEvent.click(button));

        expect(click).toHaveBeenCalled();
    });
});
