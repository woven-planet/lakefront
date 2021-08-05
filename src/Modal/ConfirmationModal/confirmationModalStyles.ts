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

export const ConfirmationTitle = styled.div({
    fontWeight: 700,
    fontSize: 18,
    marginLeft: '0.5em'
});

export const ConfirmationTitleDiv = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.5em',
    svg: {
        height: '2.5em',
        width: '2.5em'
    }
});

export const ConfirmationContentSpan = styled.span({
    margin: '23px 0 33px 0',
    textAlign: 'left'
});
