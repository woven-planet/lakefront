import styled from '@emotion/styled';

export const Label = styled.span({
    cursor: 'pointer'
});

export const Bar = styled.span(({ theme }) => ({
    backgroundColor: theme?.colors?.green,
    display: 'block',
    width: 24,
    height: 8,
    borderRadius: 4
}));

export const Icon = styled.span({
    backgroundColor: '#55a379',
    borderRadius: 16,
    height: 16,
    width: 16,
    position: 'absolute',
    top: 8,
    transition: 'left 0.3s'
});

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
