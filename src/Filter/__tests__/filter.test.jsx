import React from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';

import { Filter } from '../Filter';
import { FILTERS, LOCATION } from './filter.data';
import { useFilter } from '../util';

afterAll(cleanup);

const TestComponent = (props = {}) => {
    const location = { ...LOCATION };
    const updateHistory = jest.fn;
    const filterHooks = useFilter(FILTERS, false, location, updateHistory);

    return <Filter filterHooks={filterHooks} location={location} updateHistory={updateHistory} {...props} />;
};

const ContextSwitchMenu = ({ onChange, value, options }) => {
    return (
        <>
            <div>ContextSwitchMenu</div>
            <select onChange={(e) => onChange(e.target.value)} value={value}>
                {Array.from(options.entries()).map(([key, label]) => (
                    <option key={key} value={key}>
                        {label}
                    </option>
                ))}
            </select>
        </>
    );
};

const FilterBar = () => {
    return <div>FilterBar</div>;
};

const FilterJSONConfirmationModal = ({ modalVisible }) => {
    if (modalVisible) {
        return <div>FilterJSONConfirmationModal</div>;
    }
    return null;
};

const FilterJSONInput = ({ onInputModifiedChange }) => {
    return <input onChange={onInputModifiedChange} />;
};

describe('Filter', () => {
    it('toggles the side panel', () => {
        const { container } = render(<TestComponent />);

        const h2 = container.querySelector('h2');
        const filterIcon = container.querySelector('svg');
        expect(h2.textContent).toBe('Filter Results');

        fireEvent.click(filterIcon);
        expect(h2.textContent).toBe('');
    });

    it('toggles the active section', () => {
        const { getByText } = render(<TestComponent />);

        const keywordSection = getByText(FILTERS.keywords.label);
        expect(keywordSection.querySelector('svg[aria-label="add"]')).toBeInTheDocument();
        expect(keywordSection.querySelector('svg[aria-label="remove"]')).not.toBeInTheDocument();

        fireEvent.click(keywordSection);

        expect(keywordSection.querySelector('svg[aria-label="remove"]')).toBeInTheDocument();
        expect(keywordSection.querySelector('svg[aria-label="add"]')).not.toBeInTheDocument();
    });

    describe('when onToggleCollapsed callback is provided as a prop', () => {
        const toggleCallback = jest.fn();

        const TestComponentWithCallback = () => {
            const location = { ...LOCATION };
            const updateHistory = jest.fn;
            const filterHooks = useFilter(FILTERS, false, location, updateHistory);

            return (
                <Filter
                    filterHooks={filterHooks}
                    location={location}
                    updateHistory={updateHistory}
                    onToggleCollapsed={toggleCallback}
                />
            );
        };

        it('executes callback on side panel toggle', () => {
            const { container } = render(<TestComponentWithCallback />);

            const filterIcon = container.querySelector('svg');
            fireEvent.click(filterIcon);
            fireEvent.click(filterIcon);

            expect(toggleCallback.mock.calls.length).toBe(2);
            expect(toggleCallback.mock.calls[0][0]).toBe(true);
            expect(toggleCallback.mock.calls[1][0]).toBe(false);
        });
    });

    describe('when components are passed in', () => {
        it('displays the context switch menu when provided', () => {
            const { getByText } = render(<TestComponent isJSONInputAllowed ContextSwitchMenu={ContextSwitchMenu} />);

            getByText('ContextSwitchMenu');
        });

        it('displays the filter JSON input when provided', () => {
            const { getByRole } = render(
                <TestComponent
                    isJSONInputAllowed
                    ContextSwitchMenu={ContextSwitchMenu}
                    FilterJSONInput={FilterJSONInput}
                />
            );

            fireEvent.change(getByRole('combobox'), {
                target: {
                    value: 'json'
                }
            });

            getByRole('textbox');
        });

        it('displays the JSON confirmation modal when provided', () => {
            const ContextSwitchMenu = ({ onChange, value, options }) => {
                return (
                    <select onChange={(e) => onChange(e.target.value)} value={value}>
                        {Array.from(options.entries()).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                );
            };

            const { getByRole, getByText } = render(
                <TestComponent
                    isJSONInputAllowed
                    ContextSwitchMenu={ContextSwitchMenu}
                    FilterJSONInput={FilterJSONInput}
                    FilterJSONConfirmationModal={FilterJSONConfirmationModal}
                />
            );

            fireEvent.change(getByRole('combobox'), {
                target: {
                    value: 'json'
                }
            });
            fireEvent.change(getByRole('textbox'), {
                target: {
                    value: 'changed'
                }
            });
            fireEvent.change(getByRole('combobox'), {
                target: {
                    value: 'filter'
                }
            });

            getByText('FilterJSONConfirmationModal');
        });

        it('displays the filter bar when provided', () => {
            const { getByText } = render(
                <TestComponent isJSONInputAllowed FilterBar={FilterBar} hideFilterBar={false} />
            );

            getByText('FilterBar');
        });
    });
});
