import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import StepFunctionAuthoring from '../StepFunctionAuthoring';
import MockTestRenderer from './TestRenderer.util';
import { parallelExample } from './stepFunctionAuthoring.data';

jest.mock('src/StepFunctionRenderer/StepFunctionRenderer', () => jest.fn((props) => <MockTestRenderer {...props} />))

describe('StepFunctionAuthoring', () => {
    describe('general rendering', () => {
        it('renders a "Task" Node when initialGraphState is undefined', () => {
            const { container } = render(
                <StepFunctionAuthoring />
            );

            expect(container.querySelector('#Task')).toBeInTheDocument()
        });

        it('renders a initialGraphState when provided', () => {
            const { container } = render(
                <StepFunctionAuthoring initialGraphState={parallelExample} />
            );

            expect(container.querySelectorAll('.type')).toHaveLength(3);
            expect(container.querySelector('#LookupCustomerInfo')).toBeInTheDocument()
            expect(container.querySelector('#LookupAddress')).toBeInTheDocument()
            expect(container.querySelector('#LookupPhone')).toBeInTheDocument()
        });

        it('renders inputs properly', () => {
            const { queryAllByRole } = render(
                <StepFunctionAuthoring />
            );

            // check for correct number of inputs
            const inputNodes = queryAllByRole('textbox');
            expect(inputNodes).toHaveLength(2);

            // check for correct input labels
            const options = ['Name', 'Next'];
            const labels = [];
            
            for (const node of inputNodes) {
                labels.push(node.parentElement.firstChild.innerHTML);
            }

            for (const option of options) {
                expect(labels).toContain(option);
            }
        });

        it('renders node type options properly', () => {
            const { container } = render(
                <StepFunctionAuthoring />
            );

            // check for correct number of labels
            const labelNodes = container.querySelectorAll('.label');
            expect(labelNodes).toHaveLength(5);
            
            // check for correct labels
            const options = ['Task', 'Choice', 'Succeed', 'Map', 'Parallel'];
            const labels = [];

            for (const node of labelNodes) {
                labels.push(node.innerHTML);
            }

            for (const option of options) {
                expect(labels).toContain(option);
            }
        });

        describe('form buttons', () => {
            it('renders buttons properly', () => {
                const { getByText } = render(
                    <StepFunctionAuthoring />
                );
    
                getByText('Save');
                getByText('Cancel');
            });
    
            it('save button is disabled by default', () => {
                const { getByText } = render(
                    <StepFunctionAuthoring />
                );
    
                expect(getByText('Save')).toBeDisabled();
            });

            it('save button is enabled on node click', () => {
                const { container, getByText } = render(
                    <StepFunctionAuthoring />
                );

                expect(getByText('Save')).toBeDisabled();

                fireEvent.click(container.querySelector('#Task'));
    
                expect(getByText('Save')).not.toBeDisabled();
            });
        });
    });
});