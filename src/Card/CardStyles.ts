import styled from '@emotion/styled';
import colors from 'src/styles/lakefrontColors';

export const CardContentContainer = styled.div(() => ({
    display: 'inline-grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: '55px auto auto',
    width: 250,
    height: 'auto',
    border: `1px solid ${colors.alto}`,
    borderRadius: 3,
    padding: 10,
    margin: 10,
    'h1': {
        fontSize: 18,
        height: 'min-content'
    },
    'p': {
        gridArea: '2',
        marginTop: 'unset',
        fontSize: 12
    },
    'div': {
        gridArea: '3/1'
    },
    'button': {
        gridArea: '1/2'
    },
}));
