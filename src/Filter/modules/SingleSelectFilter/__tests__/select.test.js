import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Select from '../Select';

const options = [
    { label: 'one', value: '1' },
    { label: 'two', value: '2' }
];

describe('Select', () => {
    it('renders default item and available options', () => {
        const { queryAllByText } = render(<Select onChange={() => null} value={'1'} options={options} />);
        // Default option text should render twice (as selected option and available option)
        expect(queryAllByText(options[0].label)).toHaveLength(2);
        expect(queryAllByText(options[1].label)).toHaveLength(1);
    });

    it('should render with correct value', () => {
        const { container, rerender } = render(<Select onChange={() => null} value={'1'} options={options} />);

        const selectElement = container.querySelector('select');
        expect(selectElement).toHaveValue('1');

        rerender(<Select onChange={() => null} value={'2'} options={options} />);

        expect(container.querySelector('select')).toHaveValue('2');
    });

    it('triggers handler on select change', () => {
        const onChangeCallback = jest.fn();
        const { container } = render(<Select onChange={onChangeCallback} value={'1'} options={options} />);

        fireEvent.change(container.querySelector('select'), { target: { value: '2' } });
        expect(onChangeCallback).toHaveBeenCalled();
    });
});
