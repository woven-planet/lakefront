import styled from '@emotion/styled';
import { ToggleProps } from './Toggle';
import { hexToRgb } from '../styles/stylesUtil';

export const Label = styled.span({
    cursor: 'pointer'
});

export const Bar = styled.span<Pick<ToggleProps, 'options' | 'value'>>(({ theme, options, value }) => ({
    backgroundColor: value === options[0].value ? theme?.colors?.alto : theme?.colors?.green,
    display: 'block',
    width: 36,
    height: 14,
    borderRadius: 8
}));

export const Icon = styled.span(({ theme }) => ({
    backgroundColor: theme?.colors?.storm,
    borderRadius: 20,
    height: 20,
    width: 20,
    position: 'absolute',
    top: 8.5,
    transition: 'left 0.2s',
    ':hover': {
        boxShadow: `0 0 0 11px ${hexToRgb(theme?.colors?.green, 0.2)}`,
        transition: 'all 0.2s ease-in-out'
    },
    ':active': {
        boxShadow: `0 0 0 11px ${hexToRgb(theme?.colors?.green, 0.4)}`,
    }
}));

export const IconWrapper = styled.div({
    position: 'relative',
    margin: '0 14px',
    padding: '12px 0',
    cursor: 'pointer'
});

export const ToggleWrapper = styled.div({
    display: 'flex',
    alignItems: 'center'
});
