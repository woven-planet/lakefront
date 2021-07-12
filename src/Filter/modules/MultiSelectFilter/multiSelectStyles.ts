import { GroupTypeBase, Styles } from 'react-select';
import { MultiSelectOption } from './MultiSelect';

export const MULTI_SELECT_STYLES: Partial<Styles<MultiSelectOption, true, GroupTypeBase<MultiSelectOption>>> = {
    control: (styles, state) => ({
        ...styles,
        backgroundColor: '#ffffff',
        borderColor: state.theme.colors.storm,
        boxShadow: state.isFocused ? `0 0 0 1px ${state.theme.colors.storm}` : 'none',
        borderRadius: 2,
        ':hover': {
            borderColor: state.theme.colors.storm
        }
    }),
    multiValue: (styles, state) => ({
        ...styles,
        backgroundColor: state.theme.colors.selago
    }),
    option: (styles, state) => ({
        ...styles,
        backgroundColor: state.isFocused ? state.theme.colors.selago : '#ffffff'
    })
};
