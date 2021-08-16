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

export interface TypeaheadSearchProps {
    children: (debouncedSearchText: string) => ReactNode;
    submitSearch: (searchText: string) => void;
    initialSearchText?: string;
    inputDebounceMs?: number;
    placeholder?: string;
    renderInPortal?: boolean;
    autoFocus?: boolean;
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
                        RESULTS HERE
                        {debouncedSearchText && children(debouncedSearchText)}
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
