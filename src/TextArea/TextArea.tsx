import { ComponentPropsWithRef, FC, forwardRef } from 'react';
import { ThemeProvider } from '@emotion/react';
import { StyledTextArea, StyledLabel } from './textAreaStyles';
import theme from 'src/styles/theme';

export interface TextAreaProps {
    /**
     * This shows a label above the TextArea when provided.
     */
    label?: string;
    /**
     * If not empty, the TextArea component will be displayed in an error state with the provided error message.
     */
    error?: string;

}

/**
 * TextArea Component
 *
 * The TextArea component takes in native textarea props as well as its own TextAreaProps. The state is not managed
 * in this component and should be handled in the consuming app.
 *
 */
const TextArea: FC<TextAreaProps & ComponentPropsWithRef<'textarea'>> = forwardRef(({ label, error = '', ...props }, ref) => {
    return (
        <ThemeProvider theme={theme}>
            <StyledLabel error={error}>
                {label && <span>{label}</span>}
                <StyledTextArea ref={ref} error={error} {...props} />
                <div>{error}</div>
            </StyledLabel>
        </ThemeProvider>
    );
});

export default TextArea;
