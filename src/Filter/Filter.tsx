import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import queryString from 'query-string';
import FilterIcon from '@material-ui/icons/FilterList';
import Icon from '@material-ui/core/Icon';

import { FilterComponentProps, FilterMode } from './types';
import { FILTER_MODE_OPTIONS, getCurrentBrowserQueryParams, getDefaultJsonViewValue } from './util';
import styles from './filterContainer.module.scss';

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

    const containerClasses = classNames(
        styles.container,
        { [styles.showJSONInput]: isJSONInputAllowed && jsonQueryParams.jsonView },
        { [styles.panelCollapsed]: isCollapsed }
    );

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
        setJsonQueryParams(params => ({ ...params, jsonView }));
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
    };
    const toggleSection = (section: string) => {
        const newSection = activeSection === section ? '' : section;
        setActiveSection(newSection);
    };

    return (
        <div className={containerClasses}>
            <div className={classNames(styles.sidePanel)}>
                <h2 className={styles.filterHeader}>
                    {(!isCollapsed && ContextSwitchMenu) && (
                        isJSONInputAllowed ? (
                            <ContextSwitchMenu
                                options={FILTER_MODE_OPTIONS}
                                value={jsonQueryParams.jsonView ? FilterMode.JSON : FilterMode.FilterUI}
                                onChange={toggleJsonView}
                                triggerClassName={styles.filterContextTriggerContent}
                            />
                        ) : 'Filter Results'
                    )}
                    <FilterIcon className={styles.filterMenuIcon} onClick={toggleCollapsed} />
                </h2>

                {(!isJSONInputAllowed || !jsonQueryParams.jsonView) &&
                    <div className={styles.filters}>
                        {Object.entries(filters).filter(([, f]) => !f.inputHidden).map(([key, filter]) => (
                            <section key={key}>
                                <h3 onClick={() => toggleSection(key)}>
                                    {filter.label}
                                    <Icon>{activeSection !== key ? 'add' : 'remove'}</Icon>
                                </h3>
                                {activeSection === key && (
                                    <>
                                        <p className={styles.filterDescription}>{filter.description}</p>
                                        <div className={styles.filterSection}>
                                            {filter.renderComponent({
                                                name: key,
                                                value: filterValues[key],
                                                update: value => updateFilter(key, value)
                                            })}
                                        </div>
                                    </>
                                )}
                            </section>
                        ))}
                    </div>
                }

                {(isJSONInputAllowed && jsonQueryParams.jsonView && FilterJSONInput) &&
                    <div className={styles.jsonInputSection}>
                        <FilterJSONInput filterHooks={filterHooks} onInputModifiedChange={setIsJSONInputModified} />
                    </div>
                }

                {(isJSONInputAllowed && FilterJSONConfirmationModal) &&
                    <FilterJSONConfirmationModal
                        modalVisible={isJSONModifiedModalShowing}
                        handleModalClose={() => setIsJSONModifiedModalShowing(false)}
                        onConfirm={confirmSwitchToFilterUI}
                    />
                }
            </div>

            {
                (!hideFilterBar && FilterBar) && (
                    <FilterBar
                        filters={filters}
                        filterValues={filterValues}
                        clearFilter={clearFilter}
                        clearAllFilter={clearAllFilters}
                    />
                )
            }

            {children}
        </div>
    );
};

export default Filter;
