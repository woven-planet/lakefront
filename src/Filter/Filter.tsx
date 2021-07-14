import { FC, useEffect, useState } from 'react';
import queryString from 'query-string';
import { FilterComponentProps, FilterMode } from './types';
import { FILTER_MODE_OPTIONS, getCurrentBrowserQueryParams, getDefaultJsonViewValue } from './util';
import { ThemeProvider } from '@emotion/react';
import {
    FilterContainer,
    FilterSectionBody,
    FilterSectionDescription,
    FilterHeader,
    FiltersSection,
    SidePanel
} from './filterStyles';
import { ReactComponent as Add } from './assets/add.svg';
import { ReactComponent as Remove } from './assets/remove.svg';
import { ReactComponent as FilterIcon } from './assets/filterIcon.svg';
import theme from 'src/styles/theme';

/**
 * Filter Component
 *
 * The Filter component can be used to display the effects
 * the `useFilter` hook (or other filter state manager) has on
 * a given page. Various components can be provided to increase/limit
 * what changes are diplayed.
 */
export const Filter: FC<FilterComponentProps> = ({
    ContextSwitchMenu,
    FilterBar,
    FilterJSONConfirmationModal,
    FilterJSONInput,
    additionalQueryParams,
    children,
    filterHooks,
    hideFilterBar = true,
    initialActiveSection = '',
    isCollapsed: isCollapsedProp,
    isJSONInputAllowed = false,
    location,
    onToggleCollapsed,
    updateHistory
}) => {
    const urlParams = queryString.parse(location.search);
    const [isCollapsedState, setIsCollapsedState] = useState(false);
    const [activeSection, setActiveSection] = useState(initialActiveSection);
    const [jsonQueryParams, setJsonQueryParams] = useState(
        isJSONInputAllowed ? { jsonView: getDefaultJsonViewValue(urlParams) } : {}
    );
    const [isJSONInputModified, setIsJSONInputModified] = useState(false);
    const [isJSONModifiedModalShowing, setIsJSONModifiedModalShowing] = useState(false);

    // use isCollapsed prop if provided to track state externally, otherwise track state internally
    const isCollapsed = isCollapsedProp === undefined ? isCollapsedState : isCollapsedProp;

    const { filters, filterValues, updateFilter, clearFilter, clearAllFilters } = filterHooks;

    // save the additional query parameters in the browser url
    useEffect(() => {
        const excludeKeys = [
            ...Object.keys(additionalQueryParams || {}),
            ...(isJSONInputAllowed ? Object.keys(jsonQueryParams) : [])
        ];
        const existingQueryParams = getCurrentBrowserQueryParams(location, excludeKeys);

        const newQueryParams = {
            ...existingQueryParams,
            ...additionalQueryParams,
            ...(isJSONInputAllowed ? jsonQueryParams : {})
        };
        updateHistory({ search: queryString.stringify(newQueryParams), hash: location.hash });
    }, [additionalQueryParams, jsonQueryParams]);

    const toggleCollapsed = () => {
        const collapsedState = !isCollapsed;
        setIsCollapsedState(collapsedState);
        if (onToggleCollapsed) {
            onToggleCollapsed(collapsedState);
        }
    };
    const setJsonViewParam = (jsonView: boolean) => {
        setJsonQueryParams((params) => ({ ...params, jsonView }));
    };
    const toggleJsonView = (mode: FilterMode) => {
        const jsonView = mode === FilterMode.JSON;

        // if switching back to the filter UI but there is unapplied JSON, show confirmation modal before proceeding
        if (!jsonView && isJSONInputModified) {
            setIsJSONModifiedModalShowing(true);
        } else {
            setJsonViewParam(jsonView);
        }
    };
    const confirmSwitchToFilterUI = () => {
        setJsonViewParam(false);
        setIsJSONInputModified(false);
    };
    const toggleSection = (section: string) => {
        const newSection = activeSection === section ? '' : section;
        setActiveSection(newSection);
    };

    return (
        <ThemeProvider theme={theme}>
            <FilterContainer
                showJSONInput={Boolean(isJSONInputAllowed && jsonQueryParams.jsonView)}
                isCollapsed={isCollapsed}
                hideFilterBar={hideFilterBar}
            >
                <SidePanel className="sidePanel">
                    <FilterHeader className="filterHeader">
                        {!isCollapsed &&
                            ((ContextSwitchMenu && isJSONInputAllowed) ? (
                                <ContextSwitchMenu
                                    options={FILTER_MODE_OPTIONS}
                                    value={jsonQueryParams.jsonView ? FilterMode.JSON : FilterMode.FilterUI}
                                    onChange={toggleJsonView}
                                    triggerClassName="filterContextTriggerContent"
                                />
                            ) : (
                                'Filter Results'
                            ))}
                        <FilterIcon className="filterMenuIcon" onClick={toggleCollapsed} />
                    </FilterHeader>

                    {(!isJSONInputAllowed || !jsonQueryParams.jsonView) && (
                        <FiltersSection className="filters">
                            {Object.entries(filters)
                                .filter(([, f]) => !f.inputHidden)
                                .map(([key, filter]) => (
                                    <section key={key}>
                                        <h3 onClick={() => toggleSection(key)}>
                                            {filter.label}
                                            {activeSection !== key ? <Add aria-label="add" /> : <Remove aria-label="remove" />}
                                        </h3>
                                        {activeSection === key && (
                                            <>
                                                <FilterSectionDescription>
                                                    {filter.description}
                                                </FilterSectionDescription>
                                                <FilterSectionBody>
                                                    {filter.renderComponent({
                                                        name: key,
                                                        value: filterValues[key],
                                                        update: (value) => updateFilter(key, value)
                                                    })}
                                                </FilterSectionBody>
                                            </>
                                        )}
                                    </section>
                                ))}
                        </FiltersSection>
                    )}

                    {isJSONInputAllowed && jsonQueryParams.jsonView && FilterJSONInput && (
                        <div className="jsonInputSection">
                            <FilterJSONInput filterHooks={filterHooks} onInputModifiedChange={setIsJSONInputModified} />
                        </div>
                    )}

                    {isJSONInputAllowed && FilterJSONConfirmationModal && (
                        <FilterJSONConfirmationModal
                            modalVisible={isJSONModifiedModalShowing}
                            handleModalClose={() => setIsJSONModifiedModalShowing(false)}
                            onConfirm={confirmSwitchToFilterUI}
                        />
                    )}
                </SidePanel>

                {!hideFilterBar && FilterBar && (
                    <FilterBar
                        filters={filters}
                        filterValues={filterValues}
                        clearFilter={clearFilter}
                        clearAllFilter={clearAllFilters}
                    />
                )}

                {children}
            </FilterContainer>
        </ThemeProvider>
    );
};

export default Filter;
