import styled from '@emotion/styled';
import colors  from 'src/styles/lakefrontColors';


export const CardContentContainer = styled.div(() => ({
    display: 'inline-grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: '1fr 1fr auto',
    border: `1px solid ${colors.alto}`,
    borderRadius: 3,
    padding: 10,

    'h1': {
        fontSize: 20
    },
    'p': {
        gridArea: 2,
        fontSize: 14
    },
    'div': {
        gridArea: '3/1',
        alignSelf: 'center'
    },
    'button': {
        gridArea: '1/2'
    },
}));
