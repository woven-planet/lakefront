import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectPopover from '../../SelectPopover/SelectPopover';
import Button from '../../Button/Button';

const options = [
    {
        name: 'Option 1',
        value: 'Value 1'
    },
    {
        name: 'Option 2',
        value: 'Value 2'
    }
];

describe('SelectPopover', () => {
    let handleClick;
    beforeEach(() => {
        handleClick = jest.fn();
    });

    it('should render when visible is true', () => {
        const { getByText } = render(
            <SelectPopover
                options={options}
                handleClick={handleClick}
                visible={true}
            >
                <Button icon />
            </SelectPopover>
        );

        expect(getByText(options[0].name)).toBeInTheDocument();
    });

    it('should not render when visible is false', () => {
        render(
            <SelectPopover
                options={options}
                handleClick={handleClick}
                visible={false}
            >
                <Button icon />
            </SelectPopover>
        );

        expect(screen.queryByText(options[0].name)).toBeNull();
    });

    it('should call handleClick on click', () => {
        const { getByText } = render(
            <SelectPopover
                options={options}
                handleClick={handleClick}
                visible={true}
            >
                <Button icon />
            </SelectPopover>
        );

        const item = getByText(options[0].name);
        fireEvent.click(item);

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(options[0].value);
    });
});
