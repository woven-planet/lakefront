import styled from '@emotion/styled';
import { PageProps } from './Page';

export const StyledPage = styled.div<PageProps>(() => ({
    justifyContent: 'center',
    padding: '42px',
}));

export const StyledHeader = styled.div(() => ({
    margin: '0 0 12px'
}));
