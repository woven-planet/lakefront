import { Component } from 'react';

import Select, { InputProps, OptionsType } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { SelectOption } from 'src/types/global';
import { MULTI_SELECT_STYLES } from './multiSelectStyles';
import { createUniqueOptions, getUniqueOptions, parseItems } from './multiSelectUtil';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import MultiValueInput from './MultiValueInput';

export type MultiSelectOption = SelectOption<string>;

/**
 * `MultiSelectProps` are the props to be provided to the MultiSelect
 * component.
 */
interface MultiSelectProps {
    items: MultiSelectOption[];
    value: MultiSelectOption[];
    selectItem(items: string[]): void;
    placeholder?: string;
    title: string;
    creatable?: boolean;
    handleCreateItem?: (item: string[]) => void;
    disableMenu?: boolean;
    autoFocus?: boolean;
    delimiter?: string;
}

/**
 * This represents the structure of the MultiSelect
 * component state.
 */
interface MultiSelectState {
    items: MultiSelectOption[];
    selected: string[];
}

export class MultiSelect extends Component<MultiSelectProps, MultiSelectState> {
    static defaultProps = {
        placeholder: 'Enter filter term(s)'
    };

    constructor(props: MultiSelectProps) {
        super(props);

        this.state = {
            items: [...props.items, ...props.value],
            selected: [...props.value.map((option) => option.value)]
        };
    }

    handleChange = (selectedOptions: MultiSelectOption[] | OptionsType<MultiSelectOption> | null) => {
        const items = selectedOptions ? selectedOptions.map((option: MultiSelectOption) => option.value) : [];
        this.setState({ selected: items });
        this.props.selectItem(items);
    };

    handleCreate = (item: string) => {
        const { handleCreateItem, delimiter, selectItem } = this.props;
        const { items, selected } = this.state;

        const parsedItems = parseItems(item, delimiter);
        const newOptions = createUniqueOptions(parsedItems);

        this.setState({
            items: [...items, ...newOptions],
            selected: [...selected, ...parsedItems]
        });

        selectItem([...selected, ...parsedItems]);

        if (handleCreateItem) {
            handleCreateItem(parsedItems);
        }
    };

    componentDidMount = () => {
        const itemsStateCopy = [...this.state.items];
        const availableOptionsResult = getUniqueOptions(itemsStateCopy);

        this.setState({ items: availableOptionsResult as MultiSelectOption[] });
    };


    render() {
        const {
            items,
            placeholder,
            value,
            title,
            creatable,
            disableMenu = false,
            autoFocus = true,
            delimiter
        } = this.props;

        const disabledMenuComponents = disableMenu
            ? {
                DropdownIndicator: null,
                Menu: () => <></>
            }
            : {};

        const parseMultiValueComponents = delimiter
            ? {
                Input: (props: Omit<InputProps, 'theme'>) => (
                    <MultiValueInput {...props} handleCreate={this.handleCreate} />
                )
            }
            : {};

        return (
            <ThemeProvider theme={theme}>
                {creatable ? (
                    <CreatableSelect
                        components={{
                            ...disabledMenuComponents,
                            ...parseMultiValueComponents
                        }}
                        autoFocus={autoFocus}
                        value={value}
                        isMulti
                        name={title}
                        placeholder={placeholder}
                        onChange={this.handleChange}
                        onCreateOption={this.handleCreate}
                        options={items}
                        styles={MULTI_SELECT_STYLES}
                        theme={(defaultTheme) => ({
                            ...defaultTheme,
                            colors: {
                                ...theme.colors,
                                primary: theme.colors.white,
                                primary25: theme.colors.mercury,
                                neutral0: theme.colors.white
                            }
                        })}
                    />
                ) : (
                    <Select
                        autoFocus={autoFocus}
                        value={value}
                        isMulti
                        name={title}
                        placeholder={placeholder}
                        onChange={this.handleChange}
                        options={items}
                        styles={MULTI_SELECT_STYLES}
                        theme={(defaultTheme) => ({
                            ...defaultTheme,
                            colors: {
                                ...theme.colors,
                                primary: theme.colors.white,
                                primary25: theme.colors.mercury,
                                neutral0: theme.colors.white
                            }
                        })}
                    />
                )}
            </ThemeProvider>
        );
    }
}

export default MultiSelect;
