import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import StepFunctionAuthoring from '../StepFunctionAuthoring';
import MockTestRenderer from './TestRenderer.util';
import { parallelExample, simpleExample } from './stepFunctionAuthoring.data';
import { RESET_MODAL } from '../util';

jest.mock('src/StepFunctionRenderer/StepFunctionRenderer', () => jest.fn((props) => <MockTestRenderer {...props} />));

describe('StepFunctionAuthoring', () => {
    describe('general rendering', () => {
        it('renders a "Task" Node when initialGraphState is undefined', () => {
            const { container } = render(<StepFunctionAuthoring />);

            expect(container.querySelector('#Task')).toBeInTheDocument();
        });

        it('renders a initialGraphState when provided', () => {
            const { container } = render(<StepFunctionAuthoring initialGraphState={parallelExample} />);

            expect(container.querySelectorAll('.type')).toHaveLength(3);
            expect(container.querySelector('#LookupCustomerInfo')).toBeInTheDocument();
            expect(container.querySelector('#LookupAddress')).toBeInTheDocument();
            expect(container.querySelector('#LookupPhone')).toBeInTheDocument();
        });

        it('renders node type options properly', () => {
            const { container } = render(<StepFunctionAuthoring />);

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

        describe('form inputs', () => {
            it('renders inputs properly', () => {
                const { queryAllByRole } = render(<StepFunctionAuthoring />);

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

            it('displays the node name and next node', () => {
                const { container } = render(<StepFunctionAuthoring initialGraphState={simpleExample} />);

                fireEvent.click(container.querySelector('#Task'));

                expect(container.querySelector('input[value="Task"]')).toBeInTheDocument();
                expect(container.querySelector('input[value="Second"]')).toBeInTheDocument();
            });
        });

        describe('form buttons', () => {
            it('renders buttons properly', () => {
                const { getByText } = render(<StepFunctionAuthoring />);

                getByText('Save');
                getByText('Cancel');
                getByText('Reset');
            });

            it('save button is disabled by default', () => {
                const { getByText } = render(<StepFunctionAuthoring />);

                expect(getByText('Save')).toBeDisabled();
            });

            it('save button is enabled on node click', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);

                expect(getByText('Save')).toBeDisabled();

                fireEvent.click(container.querySelector('#Task'));

                expect(getByText('Save')).not.toBeDisabled();
            });
        });
    });

    describe('events', () => {
        describe('task node events', () => {
            it('displays menu on context click', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);

                fireEvent.contextMenu(container.querySelector('#Task'));

                expect(getByText('Add Task After')).toBeInTheDocument();
            });

            it('adds task on "Add Task After" menu click', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);

                expect(container.querySelectorAll('.type')).toHaveLength(1);

                fireEvent.contextMenu(container.querySelector('#Task'));
                fireEvent.click(getByText('Add Task After'));

                expect(container.querySelectorAll('.type')).toHaveLength(2);
            });
        });

        describe('choice node events', () => {
            it('changes selected task node to choice node on save', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);

                expect(container.querySelector('.type').innerHTML).toBe('Task');
                fireEvent.click(container.querySelector('#Task'));
                fireEvent.click(container.querySelector('input[value="Choice"]'));
                fireEvent.click(getByText('Save'));

                expect(container.querySelector('.type').innerHTML).toBe('Choice');
            });

            it('adds a choice if none exist on type change to "Choice"', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);

                expect(container.querySelectorAll('.type')).toHaveLength(1);
                fireEvent.click(container.querySelector('#Task'));
                fireEvent.click(container.querySelector('input[value="Choice"]'));
                fireEvent.click(getByText('Save'));

                expect(container.querySelectorAll('.type')).toHaveLength(2);
            });

            it('uses already existing choice on type change to "Choice"', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);

                fireEvent.contextMenu(container.querySelector('#Task'));
                fireEvent.click(getByText('Add Task After'));

                expect(container.querySelectorAll('.type')).toHaveLength(2);

                fireEvent.click(container.querySelector('#Task'));
                fireEvent.click(container.querySelector('input[value="Choice"]'));
                fireEvent.click(getByText('Save'));

                expect(container.querySelectorAll('.type')).toHaveLength(2);
            });

            it('provides "Add Choice" context menu', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);

                fireEvent.contextMenu(container.querySelector('#Task'));

                expect(getByText('Add Task After')).toBeInTheDocument();

                fireEvent.click(getByText('Add Task After'));

                fireEvent.click(container.querySelector('#Task'));
                fireEvent.click(container.querySelector('input[value="Choice"]'));
                fireEvent.click(getByText('Save'));

                expect(container.querySelectorAll('.type')).toHaveLength(2);

                fireEvent.contextMenu(container.querySelector('#Task'));

                expect(getByText('Add Choice')).toBeInTheDocument();

                fireEvent.click(getByText('Add Choice'));

                expect(container.querySelectorAll('.type')).toHaveLength(3);
            });
        });

        describe('map node events', () => {
            it('changes selected task node to map node on save', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);
                fireEvent.contextMenu(container.querySelector('#Task'));

                expect(getByText('Add Task After')).toBeInTheDocument();

                fireEvent.click(container.querySelector('#Task'));
                fireEvent.click(container.querySelector('input[value="Map"]'));
                fireEvent.click(getByText('Save'));

                expect(container.querySelectorAll('.type')).toHaveLength(2);

                fireEvent.contextMenu(container.querySelector('#Task'));

                expect(getByText('Add Task After')).toBeInTheDocument();
                expect(getByText('Add Task Inside')).toBeInTheDocument();

                fireEvent.click(getByText('Add Task Inside'));

                expect(container.querySelectorAll('.type')).toHaveLength(3);
            });
        });

        describe('parallel node events', () => {
            it('changes selected task node to parallel node on save', () => {
                const { container, getByText } = render(<StepFunctionAuthoring />);
                fireEvent.contextMenu(container.querySelector('#Task'));

                expect(getByText('Add Task After')).toBeInTheDocument();

                fireEvent.click(container.querySelector('#Task'));
                fireEvent.click(container.querySelector('input[value="Parallel"]'));
                fireEvent.click(getByText('Save'));

                expect(container.querySelectorAll('.type')).toHaveLength(2);

                fireEvent.contextMenu(container.querySelector('#Task'));

                expect(getByText('Add Task After')).toBeInTheDocument();
                expect(getByText('Add Task Inside')).toBeInTheDocument();

                fireEvent.click(getByText('Add Task Inside'));

                expect(container.querySelectorAll('.type')).toHaveLength(3);
                expect(container).toHaveTextContent('Task.Branches');
            });
        });

        describe('form events', () => {
            describe('reset modal', () => {
                it('renders properly when reset button is clicked', () => {
                    const { getByText, queryAllByText } = render(<StepFunctionAuthoring />);

                    fireEvent.click(getByText(RESET_MODAL.RESET));

                    expect(queryAllByText(RESET_MODAL.TITLE)).toHaveLength(1);
                    expect(queryAllByText(RESET_MODAL.CANCEL)).toHaveLength(2);
                    expect(queryAllByText(RESET_MODAL.RESET)).toHaveLength(2);
                });

                describe(`clicking "${RESET_MODAL.CANCEL}"`, () => {
                    it('does not affect component state', () => {
                        const { container, getByText } = render(<StepFunctionAuthoring />);

                        expect(container.querySelectorAll('.type')).toHaveLength(1);

                        fireEvent.contextMenu(container.querySelector('#Task'));
                        fireEvent.click(getByText('Add Task After'));

                        expect(container.querySelectorAll('.type')).toHaveLength(2);

                        fireEvent.click(getByText(RESET_MODAL.RESET));
                        fireEvent.click(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).getByText(
                                RESET_MODAL.CANCEL
                            )
                        );

                        expect(container.querySelectorAll('.type')).toHaveLength(2);
                    });

                    it('hides the modal', () => {
                        const { container, getByText, debug } = render(<StepFunctionAuthoring />);

                        fireEvent.click(getByText(RESET_MODAL.RESET));

                        expect(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).queryByText(
                                RESET_MODAL.CANCEL
                            )
                        ).toBeInTheDocument();

                        fireEvent.click(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).getByText(
                                RESET_MODAL.CANCEL
                            )
                        );

                        expect(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).queryByText(
                                RESET_MODAL.CANCEL
                            )
                        ).not.toBeInTheDocument();
                    });
                });

                describe(`clicking "${RESET_MODAL.RESET}"`, () => {
                    it('resets the component state', () => {
                        const { container, getByText } = render(<StepFunctionAuthoring />);

                        expect(container.querySelectorAll('.type')).toHaveLength(1);

                        fireEvent.contextMenu(container.querySelector('#Task'));
                        fireEvent.click(getByText('Add Task After'));

                        expect(container.querySelectorAll('.type')).toHaveLength(2);

                        fireEvent.click(getByText(RESET_MODAL.RESET));
                        fireEvent.click(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).getByText(
                                RESET_MODAL.RESET
                            )
                        );

                        expect(container.querySelectorAll('.type')).toHaveLength(1);
                    });

                    it('clears the edit form', () => {
                        const { container, getByText } = render(<StepFunctionAuthoring initialGraphState={simpleExample} />);

                        fireEvent.contextMenu(container.querySelector('#Task'));
                        fireEvent.click(getByText('Add Task After'));

                        const newNodeId = container.querySelector('svg').children[1].id;
                        fireEvent.click(container.querySelector(`#${newNodeId}`));
                        
                        expect(container.querySelector(`input[value="${newNodeId}"]`)).toBeInTheDocument();

                        fireEvent.click(getByText(RESET_MODAL.RESET));
                        fireEvent.click(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).getByText(
                                RESET_MODAL.RESET
                            )
                        );

                        expect(container.querySelector(`input[value="${newNodeId}"]`)).not.toBeInTheDocument();
                    });

                    it('hides the modal', () => {
                        const { container, getByText, debug } = render(<StepFunctionAuthoring />);

                        fireEvent.click(getByText(RESET_MODAL.RESET));

                        expect(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).queryByText(
                                RESET_MODAL.CANCEL
                            )
                        ).toBeInTheDocument();

                        fireEvent.click(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).getByText(
                                RESET_MODAL.CANCEL
                            )
                        );

                        expect(
                            within(container.querySelector('.stepfunctionAuthoringResetModal')).queryByText(
                                RESET_MODAL.CANCEL
                            )
                        ).not.toBeInTheDocument();
                    });
                });
            });
        });
    });
});
