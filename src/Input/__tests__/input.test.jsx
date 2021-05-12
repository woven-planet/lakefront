import React from 'react';
import { render } from '@testing-library/react';
import Input from '../../Input/Input';

const LABEL = 'Label';
const ERROR = 'Error';

describe('Input', () => {
    describe('general rendering', () => {
        it('renders the label and its text', () => {
            const { container } = render(
                <Input label={LABEL} />
            );

            const [label] = container.querySelectorAll('label');

            expect(label).toHaveTextContent(LABEL);
        });

        it('should not render the label when no label prop present', () => {
            const { container } = render(
                <Input />
            );

            const spans = container.querySelectorAll('span');

            expect(spans.length).toBe(0);
        });

        it('should render the error message when error message present', () => {
            const { getByText } = render(
                <Input error={ERROR} />
            );

            const error = getByText('Error');

            expect(error).toHaveTextContent(ERROR);
        });
    });
});
