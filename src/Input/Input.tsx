import React, { ComponentPropsWithoutRef, FC } from 'react';
import { StyledInput, StyledLabel } from './inputStyles';

export interface InputProps {
    /**
     * This shows a label above the input when provided.
     */
    label?: string;
}

/**
 * Input Component
 *
 * The Input component takes in native input props as well as its own InputProps. The state is not managed
 * in this component and should be handled in the consuming app.
 *
 */
const Input: FC<InputProps & ComponentPropsWithoutRef<'input'>> = ({ label, ...props }) => {
    return (
        <>
        {
            label ? (
                <StyledLabel>
                    <span>{label}</span>
                    <StyledInput {...props} />
                </StyledLabel>
            ) : (
                <StyledInput {...props} />
            )
        }
        </>
    );
};

export default Input;
