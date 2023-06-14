import React from 'react';
import { fireEvent, getAllByText, render } from '@testing-library/react';

import Select from '../Select';
import userEvent from '@testing-library/user-event';

const options = [{ label: 'Km', value: 'metric' }, { label: 'Mi', value: 'imperial' }, {label: 'Made up system', value: 'made up'}];
const onChangeCallback = jest.fn();

describe('<Select />', () => {
    it('renders default items and text', () => {
        const { container } = render(<Select onChange={onChangeCallback} value={'metric'} options={options} />);
        expect(container.getElementsByTagName('Option')).toHaveLength(3);

        // test out options labels
        expect(container.getElementsByTagName('Option')[0]).toHaveTextContent('Km');
        expect(container.getElementsByTagName('Option')[1]).toHaveTextContent('Mi');
    });

    it('should have correct values', () => {
        const { container } = render(<Select onChange={onChangeCallback} value={'metric'} options={options} />);
        expect(container.getElementsByTagName('Option')[0]).toHaveAttribute('value', 'metric');
        expect(container.getElementsByTagName('Option')[1]).toHaveAttribute('value', 'imperial');
    });

    it('triggers handler on select change', async () => {
        const { container } = render(<Select onChange={onChangeCallback} options={options} value={undefined}/>);
        await userEvent.selectOptions(container.querySelector('select'), 'imperial');
        expect(onChangeCallback.mock.calls.length).toBe(1);
        expect(container.querySelectorAll('option')[0].selected).toBe(false);
        expect(container.querySelectorAll('option')[1].selected).toBe(true);
        expect(container.querySelectorAll('option')[2].selected).toBe(false);
    });

    it('triggers handler on multi select change', async () => {
        const { container } = render(<Select onChange={onChangeCallback} options={options} isMulti={true} value={undefined}/>);
        await userEvent.selectOptions(container.querySelector('select'), ['metric', 'imperial']);
        expect(onChangeCallback.mock.calls.length).toBe(2);
        expect(container.querySelectorAll('option')[0].selected).toBe(true);
        expect(container.querySelectorAll('option')[1].selected).toBe(true);
        expect(container.querySelectorAll('option')[2].selected).toBe(false);
    });

    it('sets the dropdown to disabled', () => {
        const { container } = render(<Select onChange={onChangeCallback} value={'metric'} options={options}
            disabled={true} />);
        const disabledSelect = container.getElementsByTagName('div')[0];
        const disabledDiv = disabledSelect.getElementsByTagName('div')[0];
        expect(disabledDiv.getElementsByTagName('div')[0]).toHaveStyle('background-color: #989898');
    });

    it('sets the id of the dropdown', () => {
        const { container } = render(<Select onChange={onChangeCallback} value={'metric'} options={options}
            id='testDropdown' />);
        expect(container.getElementsByTagName('select')[0]).toHaveAttribute('id', 'testDropdown');
    });

    it('sets the autofocus of the dropdown', () => {
        const { container } = render(<Select onChange={onChangeCallback} value={'metric'} options={options}
            autoFocus={true} />);
        expect(container.getElementsByTagName('span')[0]).toHaveTextContent('Select is focused , press Down to open the menu');
    });

});
