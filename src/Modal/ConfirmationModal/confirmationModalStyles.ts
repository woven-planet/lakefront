import styled from '@emotion/styled';

export const ConfirmationDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',

    span: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    },

    a: {
        display: 'inline-block',
        marginBottom: '40px'
    },

    h4: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        marginInlineStart: 0,
        marginInlineEnd: 0,
        marginTop: '12px'
    }
});

export const ConfirmationTitleDiv = styled.div({
    display: 'inline-flex',

    svg: {
        height: '45px',
        width: '45px'
    }
});

export const ConfirmationContentSpan = styled.span({
    margin: '23px 0 33px 0',
    textAlign: 'left'
});
