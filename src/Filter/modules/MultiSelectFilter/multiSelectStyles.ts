import { GroupTypeBase, InputProps, Styles } from 'react-select';
import { MultiSelectOption } from './MultiSelect';
import { lightenDarkenColor } from 'src/styles/stylesUtil';
import styled from '@emotion/styled';
import TextArea from 'src/TextArea/TextArea';

const DARKEN_LEAST = -10;

export const MULTI_SELECT_STYLES: Partial<Styles<MultiSelectOption, true, GroupTypeBase<MultiSelectOption>>> = {
    control: (styles, state) => ({
        ...styles,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        border: `1px solid ${state.theme.colors.mercury}`,
        boxShadow: 'inset 0 1px 2px 0 rgb(0 0 0 / 20%), inset 0 0 0 1px rgb(0 0 0 / 20%)',
        ...(state.isFocused && {
            border: `1px solid ${state.theme.colors.storm}`,
            outline: 0
        }),
        ':hover': {
            backgroundColor: lightenDarkenColor(state.theme?.colors?.white, DARKEN_LEAST),
            border: `1px solid ${state.theme.colors.storm}`,
            outline: 0
        }
    }),
    multiValue: (styles, state) => ({
        ...styles,
        backgroundColor: state.theme.colors.selago,
        ':hover': {
            backgroundColor: lightenDarkenColor(state.theme.colors.selago, DARKEN_LEAST)
        }
    }),
    option: (styles, state) => ({
        ...styles,
        backgroundColor: state.isFocused ? state.theme.colors.selago : '#ffffff'
    })
};

export const MultiValueInputContainer = styled.div({
    'textarea + div': {
        minHeight: 0,
        marginTop: 0 
     }
});

    export const MultiValueInput = styled(TextArea)({
        height: 20,
        width: '125%',
        borderColor: 'transparent',
        ':focus': {
            borderColor: 'transparent'
        },
        backgroundColor: 'transparent',
        margin: '-8px 0 0 0',
        textIndent: -10
    });
