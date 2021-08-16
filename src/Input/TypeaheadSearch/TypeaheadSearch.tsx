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
import Input from 'src/Input/Input';
import { SearchResultsPopover, TypeaheadSearchContainer } from './typeaheadSearchStyles';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import TypeaheadResults, { TypeaheadResultItem } from './TypeaheadResults';

export interface TypeaheadSearchProps {
    /**
     * The callback to render search text and/or asynchronous search results.
     */
    children?: (debouncedSearchText: string, fetchResults?: (searchText: string) => Promise<TypeaheadResultItem[]>) => ReactNode;
    /**
     * The request to retrieve and format results using the search text. This is useful
     * if the user does not want to supply their own callback render function as children.
     */
     fetchResults?: (searchText: string) => Promise<TypeaheadResultItem[]>;
    /**
     * The action to run using the entered search text on submit.
     */
    submitSearch: (searchText: string) => void;
    /**
     * The initial value of the search text input.
     */
    initialSearchText?: string;
    /**
     * The time (in `ms`) to delay between keystrokes before updating the search value. `Default = 250ms`.
     */
    inputDebounceMs?: number;
    /**
     * The placeholder text to display when the input is empty.
     */
    placeholder?: string;
    /**
     * When true, the component will mount a div to the body and render the search results through it.
     * This is useful when the popover would be inside a scrollable container or one with "overflow: hidden"
     * so it doesn't get cut off. Uses IntersectionObserver and needs a polyfill if IE compatibility is needed.
     */
    renderInPortal?: boolean;
    /**
     * Whether the search input should be focused on initialization.
     */
    autoFocus?: boolean;
    /**
     * Where the search results popover should render in relation to the search input.
     */
    placement?: 'bottom-start' | 'bottom-end';
}

const TypeaheadSearch: FC<TypeaheadSearchProps & ComponentPropsWithoutRef<'input'>> = ({
    submitSearch,
    children,
    initialSearchText,
    placeholder,
    inputDebounceMs = 250,
    renderInPortal = false,
    autoFocus,
    placement = 'bottom-end',
    fetchResults,
    ...restInputProps
}) => {
    const searchInputContainerRef = createRef<HTMLDivElement>();
    const [portal, setPortal] = useState<HTMLElement | null>(null);
    const [popoverElement, setPopoverElement] = useState<HTMLElement | null>(null);
    const [update, setUpdate] = useState<number>(0);

    const [searchTextChanged, setSearchTextChanged] = useState(false);
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce(searchText, inputDebounceMs);

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
                    <SearchResultsPopover
                        className="searchResultsPopover"
                        placement={placement}
                    >
                        {(debouncedSearchText && children) && children(debouncedSearchText, fetchResults)}
                        {(debouncedSearchText && !children) && <TypeaheadResults debouncedText={debouncedSearchText} fetchResults={fetchResults} />}
                    </SearchResultsPopover>
                )}
            </>
        );
    }, [children, resultsOpen, debouncedSearchText, popoverElement, placement]);

    return (
        <ThemeProvider theme={theme}>
            <TypeaheadSearchContainer ref={searchInputContainerRef} placement={placement}>
                <form onSubmit={handleSearchSubmit}>
                    <div className="inputWrapper" ref={popoverNodeMounted}>
                        <Input
                            {...restInputProps}
                            type="text"
                            placeholder={placeholder}
                            autoComplete={'off'}
                            onChange={handleInputChange}
                            value={inputValue}
                            autoFocus={autoFocus}
                            className="typeaheadInput"
                        />
                        {portal ? createPortal(popover, portal) : popover}
                    </div>
                </form>
                <SearchIcon className="typeaheadSearchIcon" />
            </TypeaheadSearchContainer>
        </ThemeProvider>
    );
};

export default TypeaheadSearch;
