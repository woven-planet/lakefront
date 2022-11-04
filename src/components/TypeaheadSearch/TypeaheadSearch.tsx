import {
    ChangeEvent,
    ComponentPropsWithoutRef,
    FC,
    FormEvent,
    ReactNode,
    createRef,
    useEffect,
    useMemo,
    useState
} from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as SearchIcon } from './assets/search.svg';
import useDebounce from 'src/lib/hooks/useDebounce';
import Input from 'src/components/Input/Input';
import { SearchResultsPopover, TypeaheadSearchContainer } from './typeaheadSearchStyles';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import TypeaheadResults, { TypeaheadResultItem } from './TypeaheadResults';

export interface TypeaheadSearchResultProps {
    searchText: string;
    onResultSelect: (result: TypeaheadResultItem) => void;
    fetchResults?: (searchText: string) => Promise<TypeaheadResultItem[]>;
}

export interface TypeaheadSearchProps {
    /**
     * Whether the search input should be focused on initialization.
     */
    autoFocus?: boolean;
    /**
     * The minimum amount of characters a user must enter before a (non-submit triggered)
     * search will be initiated. `Default = 1`.
     */
    characterMinimum?: number;
    /**
     * The callback to render search text and/or asynchronous search results.
     */
    children?: (typeaheadSearchResultProps: TypeaheadSearchResultProps) => ReactNode;
    /**
     * The request to retrieve and format results using the search text. This is useful
     * if the user does not want to supply their own callback render function as children.
     */
    fetchResults?: (searchText: string) => Promise<TypeaheadResultItem[]>;
    /**
     * The initial value of the search text input.
     */
    initialSearchText?: string;
    /**
     * The time (in `ms`) to delay between keystrokes before updating the search value. `Default = 250ms`.
     */
    inputDebounceMs?: number;
    /**
     * The action to run on a selected result.
     */
    onResultSelect?: (result: TypeaheadResultItem) => void;
    /**
     * The placeholder text to display when the input is empty.
     */
    placeholder?: string;
    /**
     * Where the search results popover should render in relation to the search input.
     */
    placement?: 'bottom-start' | 'bottom-end';
    /**
     * When true, the component will mount a div to the body and render the search results through it.
     * This is useful when the popover would be inside a scrollable container or one with "overflow: hidden"
     * so it doesn't get cut off. Uses IntersectionObserver and needs a polyfill if IE compatibility is needed.
     */
    renderInPortal?: boolean;
    /**
     * The action to run using the entered search text on submit.
     */
    submitSearch: (searchText: string) => void;
    /**
     * The classes to pass to the typeahead search container.
     */
    className?: string;
}

/**
 * TypeaheadSearch Component
 *
 * The TypeaheadSearch component is a predictive search style input and especially useful
 * when the result list needs to be fetched asynchronously. The component can be used as
 * a stand-alone element (with no children) by providing a `fetchResults` function:
 *
 * ```jsx
 * <TypeaheadSearch
 *   autoFocus
 *   fetchResults={fetchResults}
 *   inputDebounceMs={250}
 *   onResultSelect={onResultSelect}
 *   placeholder="Search"
 *   placement="bottom-start"
 *   submitSearch={submitSearch}
 * />
 * ```
 *
 * If the default functionality needs to be extended to provide custom result rendering or
 * to control when the result popover should close, the user can provide a render callback
 * as follows:
 *
 * ```jsx
 * <TypeaheadSearch {...typeaheadSearchProps}>
 *    {(typeaheadSearchResultProps: TypeaheadSearchResultProps) => (
 *        <TypeaheadCustom {...options} />
 *    )}
 * </TypeaheadSearch>
 * ```
 *
 * ❗ **Note: In order to use the built in handler to close the popover when selecting a**
 * **result from the list, you'll need to spread in the props (as shown above).**
 */
const TypeaheadSearch: FC<TypeaheadSearchProps & ComponentPropsWithoutRef<'input'>> = ({
    autoFocus,
    characterMinimum = 1,
    children,
    fetchResults,
    initialSearchText,
    inputDebounceMs = 250,
    onResultSelect,
    placeholder,
    placement = 'bottom-end',
    renderInPortal = false,
    submitSearch,
    className,
    ...restInputProps
}) => {
    const searchInputContainerRef = createRef<HTMLDivElement>();
    const [portal, setPortal] = useState<HTMLElement | null>(null);
    const [popoverElement, setPopoverElement] = useState<HTMLElement | null>(null);
    const [update, setUpdate] = useState<number>(0);

    const [searchTextChanged, setSearchTextChanged] = useState(false);
    const [searchText, setSearchText] = useState('');
    const limitedText = characterMinimum <= searchText.length ? searchText : '';
    const debouncedSearchText = useDebounce(limitedText, inputDebounceMs);

    const [resultsAnchorEl, setResultsAnchorEl] = useState<HTMLDivElement | null>(null);
    const resultsOpen = Boolean(resultsAnchorEl);

    // Use internal state if user has changed it (entered input), or if no external state provided.
    // Use external state when user has NOT changed internal state, if provided (even if empty string).
    // This lets the value get set externally (e.g. by a duplicate filter), but still allows typeahead.
    const inputValue = searchTextChanged || initialSearchText === undefined ? searchText : initialSearchText;

    const showResultsPopover = () => {
        setResultsAnchorEl(searchInputContainerRef.current);
    };

    const closeResultsPopover = () => {
        setResultsAnchorEl(null);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        submitSearch(searchText);

        // Prevent additional debounces from re-opening results popover after explicitly closing it.
        // This allows the popover to close on submit when doing something other than navigating on submit.
        setSearchTextChanged(false);
        closeResultsPopover();
    };

    const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setSearchTextChanged(true);
        setSearchText(value);
    };

    const handleResultSelect = (result: TypeaheadResultItem) => {
        setSearchText(result.value);
        setSearchTextChanged(false);
        closeResultsPopover();

        if (onResultSelect) {
            onResultSelect(result);
        }
    };

    useEffect(() => {
        if (debouncedSearchText && searchTextChanged) {
            showResultsPopover();
        } else {
            closeResultsPopover();
        }
    }, [debouncedSearchText]);

    useEffect(() => {
        // reset internal state when external text changes
        setSearchTextChanged(false);
    }, [initialSearchText]);

    useEffect(() => {
        const bodyElementHTMLCollection = document.getElementsByTagName('body');
        const bodyElement = bodyElementHTMLCollection.length > 0 ? bodyElementHTMLCollection.item(0) : null;
        let observer: IntersectionObserver;
        let portalElement: HTMLElement;

        if (renderInPortal && bodyElement) {
            portalElement = document.createElement('div');

            if (!portal) {
                bodyElement.appendChild(portalElement);
            }

            if (!portal && popoverElement) {
                observer = new IntersectionObserver(() => {
                    setUpdate(new Date().getTime());
                });

                observer.observe(popoverElement);
                setPortal(portalElement);
            }
        }

        return () => {
            if (popoverElement && observer) {
                observer.unobserve(popoverElement);
            }

            if (portalElement && bodyElement && bodyElement.contains(portalElement)) {
                bodyElement.removeChild(portalElement);
            }
        };
    }, [popoverElement, renderInPortal]);

    useEffect(() => {
        if (popoverElement && portal) {
            const { left, bottom } = popoverElement.getBoundingClientRect();

            portal.style.position = 'absolute';
            portal.style[placement === 'bottom-start' ? 'left' : 'right'] = `${left}px`;
            portal.style.top = `${bottom + window.scrollY}px`;
        }
    }, [update]);

    const popoverNodeMounted = (node: HTMLDivElement) => {
        setPopoverElement(node);
    };

    const popover = useMemo(() => {
        return (
            <>
                {resultsOpen && (
                    <SearchResultsPopover className="searchResultsPopover" placement={placement}>
                        {debouncedSearchText &&
                            children &&
                            children({
                                searchText: debouncedSearchText,
                                fetchResults,
                                onResultSelect: handleResultSelect
                            })}
                        {debouncedSearchText && !children && (
                            <TypeaheadResults
                                debouncedText={debouncedSearchText}
                                fetchResults={fetchResults}
                                onResultSelect={handleResultSelect}
                            />
                        )}
                    </SearchResultsPopover>
                )}
            </>
        );
    }, [children, resultsOpen, debouncedSearchText, popoverElement, placement]);

    return (
        <ThemeProvider theme={theme}>
            <TypeaheadSearchContainer
                ref={searchInputContainerRef}
                placement={placement}
                resultOpen={resultsOpen}
                className={className}
            >
                <form onSubmit={handleSearchSubmit}>
                    <div className="inputWrapper" ref={popoverNodeMounted}>
                        <Input
                            {...restInputProps}
                            type="text"
                            placeholder={placeholder}
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={inputValue}
                            autoFocus={autoFocus}
                            className="typeaheadInput"
                        />
                        {portal ? createPortal(popover, portal) : popover}
                    </div>
                </form>
                <SearchIcon className="typeaheadSearchIcon" />
                {resultsOpen && <div className="searchResultsPopoverBackground" onClick={closeResultsPopover} />}
            </TypeaheadSearchContainer>
        </ThemeProvider>
    );
};

export default TypeaheadSearch;
