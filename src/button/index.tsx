import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ color?: string }>`
  color: ${p => p.color || 'blue'};
`;

interface ButtonProps {
    color?: string;
}

const Button: React.FC<ButtonProps> = props => {
    const { color, children, ...rest } = props;

    return (
        <StyledButton color={color} {...rest} tabIndex={0}>
            {children}
        </StyledButton>
    );
};


export { ButtonProps, Button };