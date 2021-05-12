import styled from '@emotion/styled';
import { ToggleProps } from './Toggle';
import { hexToRgb } from '../styles/stylesUtil';

export const Label = styled.span<Pick<ToggleProps, 'disabled'>>(({ theme, disabled }) => ({
    color: disabled ? theme?.colors?.doveGrey : theme?.colors?.black,
    cursor: 'pointer',
    fontSize: 16
}));

export const Bar = styled.span<Pick<ToggleProps, 'options' | 'value' | 'disabled'>>(({ theme, disabled, options, value }) => {
    const backgroundColor = value === options[0].value ? theme?.colors?.alto : theme?.colors?.green;

    return {
        backgroundColor: disabled && value === options[1].value ? theme?.colors?.vista : backgroundColor,
        borderRadius: 8,
        display: 'block',
        height: 14,
        width: 36
    }
});

export const Icon = styled.span<Pick<ToggleProps, 'disabled'>>(({ theme, disabled }) => ({
    backgroundColor: disabled ? theme?.colors?.bombay : theme?.colors?.storm,
    borderRadius: 20,
    height: 20,
    width: 20,
    position: 'absolute',
    top: 8.5,
    transition: 'left 0.2s'
}));

export const IconWrapper = styled.div<Pick<ToggleProps, 'disabled'>>(({ theme, disabled }) => ({
    position: 'relative',
    margin: '0 12px',
    padding: '12px 0',
    cursor: 'pointer',
    ':hover span:nth-of-type(2)': {
        ...(!disabled && { boxShadow: `0 0 0 11px ${hexToRgb(theme?.colors?.green, 0.2)}` }),
        transition: 'all 0.2s ease-in-out'
    },
    ':active span:nth-of-type(2)': {
        ...(!disabled && { boxShadow: `0 0 0 11px ${hexToRgb(theme?.colors?.green, 0.4)}` }),
    }
}));

export const ToggleWrapper = styled.div({
    display: 'flex',
    alignItems: 'center'
});
