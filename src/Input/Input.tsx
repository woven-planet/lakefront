import { ComponentPropsWithoutRef, FC } from 'react';
import { StyledInput, StyledLabel } from './inputStyles';

interface InputProps {
    label?: string;
}

const Input: FC<InputProps & ComponentPropsWithoutRef<'input'>> = ({ label, ...props }) => {
    return (
        <>
        {
            label ? (
                <StyledLabel>
                    {label}
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
