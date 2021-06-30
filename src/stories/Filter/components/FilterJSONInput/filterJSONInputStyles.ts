import styled from '@emotion/styled';
import TextArea from 'src/TextArea/TextArea';

export const ButtonWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em',
    button: {
        flex: 1
    },
    'button:first-of-type': {
        marginRight: 2
    },
    'button:last-of-type': {
        marginLeft: 2
    }
});

export const JSONEditor = styled(TextArea)({
    marginTop: '1em',
    width: 231
});
