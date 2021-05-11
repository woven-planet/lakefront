import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Toggle from '../Toggle';

const toggleOptions = [
    {
        name: 'First',
        value: 'first'
    },
    {
        name: 'Second',
        value: 'second'
    }
];

describe('Toggle', () => {
    let onChange;

    beforeEach(() => {
        onChange = jest.fn();
    });

    it('renders first option when value set to first option value', () => {
        const { container, getByText } = render(
            <Toggle
                options={toggleOptions}
                value={toggleOptions[0].value}
                onChange={onChange}
            />
        );

        const [icon] = container.querySelectorAll('div span:nth-of-type(2)');

        expect(getByText(toggleOptions[0].name)).toBeInTheDocument();
        expect(icon).toHaveStyle('left: 0px');
    });

    it('renders second option when value set to second option value', () => {
        const { container, getByText } = render(
            <Toggle
                options={toggleOptions}
                value={toggleOptions[1].value}
                onChange={onChange}
            />
        );

        const [icon] = container.querySelectorAll('div span:nth-of-type(2)');

        expect(getByText(toggleOptions[1].name)).toBeInTheDocument();
        expect(icon).toHaveStyle('left: 16px');
    });

    it('calls onChange properly on clicking label and switch wrapper', () => {
        const { container, getByText } = render(
            <Toggle
                options={toggleOptions}
                value={toggleOptions[0].value}
                onChange={onChange}
            />
        );

        expect(getByText(toggleOptions[0].name)).toBeInTheDocument();

        const label = getByText(toggleOptions[0].name);
        const [wrapper] = container.querySelectorAll('div');

        fireEvent.click(label);

        expect(onChange).toHaveBeenCalledWith(toggleOptions[1].value);

        fireEvent.click(wrapper);

        // We aren't changing the value, so this won't actually toggle in the test
        expect(onChange).toHaveBeenCalledWith(toggleOptions[1].value);
    });
});
