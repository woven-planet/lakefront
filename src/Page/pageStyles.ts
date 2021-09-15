import styled from '@emotion/styled';
import { PageProps } from './Page';

export const StyledPage = styled.div<PageProps>(() => ({
    justifyContent: 'center',
    padding: '42px',
}));

export const StyledHeader = styled.div(({ theme }) => ({
    margin: '0 0 12px',
    color: theme?.colors?.storm,
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 0
}));
