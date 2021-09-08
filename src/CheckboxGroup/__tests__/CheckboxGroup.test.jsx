
import React from 'react';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox/Checkbox';
import { render } from '@testing-library/react';

const JOB_TYPES = [
    { label: 'Finished', value: 'finished' },
    { label: 'Cancelled', value: 'canceled' },
    { label: 'Failed', value: 'failed' },
    { label: 'Running', value: 'running' },
    { label: 'Pending', value: 'enqueued' }
];

describe('<CheckboxGroup />', () => {
    it('renders a title and options', () => {
        const onChangeCallback = jest.fn();
        const container = render(
            <CheckboxGroup
                name="type"
                options={JOB_TYPES}
                selected={new Set([])}
                onHandleChange={onChangeCallback}
            />
        );

        const checkBoxes = container.queryAllByRole('checkbox');
        // 5 is for all checkboxes
        expect(checkBoxes).toHaveLength(5);

        // check value for each checkbox
        expect(checkBoxes[0]).toHaveAttribute('value', 'finished');
        expect(checkBoxes[1]).toHaveAttribute('value', 'canceled');
        expect(checkBoxes[2]).toHaveAttribute('value', 'failed');
        expect(checkBoxes[3]).toHaveAttribute('value', 'running');
        expect(checkBoxes[4]).toHaveAttribute('value', 'enqueued');
    });

    it('check toggling of items', () => {
        // start filter will all types selected
        const types = new Set(JOB_TYPES.map(item => item.value));
        const onChangeCallback = jest.fn();
        const container = render(
            <CheckboxGroup
                name="type"
                options={JOB_TYPES}
                selected={types}
                onHandleChange={onChangeCallback}
            />
        );

        const checkBoxes = container.queryAllByRole('checkbox');
        // expect all checkboxes checked
        checkBoxes.forEach(checkbox => {
            expect(checkbox.hasAttribute('checked'));
        });

        // test toggling one option
        checkBoxes[2].click();
        expect(onChangeCallback.mock.calls.length).toBe(1);
        const newSelection = onChangeCallback.mock.calls[0][0];
        expect(newSelection.size).toBe(4);
        expect(newSelection.has('failed')).toBe(false);
    });
});
