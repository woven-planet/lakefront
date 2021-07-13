import styled from '@emotion/styled';
import { lightenDarkenColor } from 'src/styles/stylesUtil';
import { SelectOverlayOption } from './SelectOverlay';
import { GroupTypeBase, Styles } from 'react-select';

const DARKEN_MOST = -40;
const DARKEN_LEAST = -10;

export const HiddenSelectControl = styled.select({
    display: 'none'
});

export const SELECT_OVERLAY_STYLES: Partial<Styles<SelectOverlayOption, false, GroupTypeBase<SelectOverlayOption>>> = {
    control: (defaultStyles, state) => ({
        ...defaultStyles,
        flexWrap: undefined,
        display: 'flex',
        color: state.theme.colors.storm,
        backgroundColor: state.selectProps.isDisabled
            ? lightenDarkenColor(state.theme.colors.white, DARKEN_MOST)
            : state.theme.colors.white,
        cursor: state.selectProps.isDisabled ? 'not-allowed' : 'pointer',
        alignItems: 'center',
        minWidth: 160,
        height: 36,
        padding: '0px 6px',
        borderRadius: 4,
        border: `1px solid ${state.theme.colors.mercury}`,
        fontWeight: 400,
        justifyContent: 'space-between',
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
    valueContainer: (defaultStyles) => ({
        ...defaultStyles,
        padding: '2px 4px'
    }),
    menu: (defaultStyles, state) => ({
        ...defaultStyles,
        backgroundColor: state.theme.colors.white,
        border: `1px solid ${state.theme?.colors?.cinder}`,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 8,
        zIndex: 9999
    }),
    menuList: (defaultStyles) => ({
        ...defaultStyles,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: undefined
    }),
    option: (defaultStyles, state) => ({
        ...defaultStyles,
        alignItems: 'center',
        color: state.selectProps.isDisabled
            ? lightenDarkenColor(state.theme?.colors?.white, DARKEN_MOST)
            : state.theme?.colors?.storm,
        cursor: 'pointer',
        display: 'flex',
        fontSize: 16,
        height: 40,
        minWidth: 160,
        padding: '0 12px',
        userSelect: 'none',
        ...(state.isSelected && {
            backgroundColor: state.theme?.colors?.white,
            ':hover': {
                backgroundColor: state.selectProps.isDisabled
                    ? state.theme?.colors?.white
                    : state.theme?.colors?.mercury,
                cursor: state.selectProps.isDisabled ? 'not-allowed' : undefined
            }
        }),
        ...(state.isFocused && {
            backgroundColor: state.theme?.colors?.mercury
        })
    })
};
