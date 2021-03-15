import styled from "@emotion/styled";

export const StyledLabel = styled.label({
    display: 'flex',
    flexDirection: 'column'
})

export const StyledInput = styled.input({
    height: 40,
    width: 300,
    ':focus': {
        color: ''
    },
    ':placeholder': {
        color: ''
    }
});
