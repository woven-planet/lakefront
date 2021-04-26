import React from "react";
import { render } from "@testing-library/react";
import RadioGroup from "../../RadioGroup/RadioGroup";

const name = 'Alphabet';
const options = [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'C', value: 'C'}
];

describe('RadioGroup', () => {
    describe('general rendering', () => {
        it('renders the label and its text', () => {
            const { container } = render(
                <RadioGroup name={name} options={options} />
            );

            const radioButtons = container.querySelectorAll('input');

            expect(radioButtons).toHaveLength(3);
        });

        it('should render the buttons disabled when disabled is true', () => {
            const { container } = render(
                <RadioGroup name={name} options={options} disabled={true} />
            );

            const radioButtons = container.querySelectorAll('input');

            expect(radioButtons[0]).toHaveAttribute('disabled');
            expect(radioButtons[1]).toHaveAttribute('disabled');
            expect(radioButtons[2]).toHaveAttribute('disabled');
        });
    });
});
