import { Component } from 'react';

import Select, { OptionsType, InputProps } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { SelectOption } from 'src/types/global';
import { MULTI_SELECT_STYLES } from './multiSelectStyles';
import { createOption } from './multiSelectUtil';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import { ParseMultiValue } from 'src/Filter/types';
import { MultiValueInput, MultiValueInputContainer } from './multiSelectStyles';

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
    handleCreateItem?: (item: string) => void;
    disableMenu?: boolean;
    autoFocus?: boolean;
    parseMultiValue?: ParseMultiValue;
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
        const { parseMultiValue } = this.props;
        const { items, selected } = this.state;

        let parsedItems = [item];

        if (parseMultiValue?.enabled && item.includes(parseMultiValue.delimiter)) {
            parsedItems = item.split(parseMultiValue.delimiter).filter((a) => a.trim());
        }

        const newOptions = [...new Set(parsedItems)].map(createOption);

        this.setState({
            items: [...items, ...newOptions],
            selected: [...selected, ...parsedItems]
        });

        this.props.selectItem([...selected, ...parsedItems]);

        if (this.props.handleCreateItem) {
            this.props.handleCreateItem(item);
        }
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
            parseMultiValue
        } = this.props;
        
        const Input = (props: Omit<InputProps, 'theme'>) => (
            <MultiValueInputContainer>
                <MultiValueInput
                    {...props}
                    autoFocus
                    onPaste={(e) => {
                        e.preventDefault();
                        this.handleCreate(e.clipboardData.getData('Text'));
                    }}
                />
            </MultiValueInputContainer>
        );

        const disabledMenuComponents = disableMenu
            ? {
                  DropdownIndicator: null,
                  Menu: () => <></>
              }
            : {};

        const parseMultiValueComponents = parseMultiValue
            ? {
                  Input
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
                        options={this.state.items}
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
