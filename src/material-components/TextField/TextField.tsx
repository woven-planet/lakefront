import { FC, ReactNode } from 'react';
//import { TextField } from '@mui/material';
import { TextField } from '@mui/material';
export interface TextFieldProps {
    /**
     * The classes to pass to the component.
     */
    className?: string;
    // /**
    //  * Helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill.
    //  */
    // autoComplete?: string;
    // /**
    //  * if true, the inpute element is focused during the first mount
    //  */
    // autoFocus?: boolean;
    // /**
    //  * override or extend the styles applied to the component
    //  */
    // classes?: object;
    // /**
    //  * The color of the component. It supports both default and custom theme colors.
    //  */
    // color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string;
    // /**
    //  * The default value. Use when the component is not controlled.
    //  */
    // defaultValue?: any;
    // /**
    //  * if true, the component is disabled
    //  */
    // disabled?: boolean;
    // /**
    //  * if true, the label is displayed in an error state
    //  */
    // error?: boolean;
    // /**
    //  * Props applied to the FormHelperText element
    //  */
    // FormHelperTextProps?: object;
    // /**
    //  * if true, the input will take up the full width of its container
    //  */
    // fullWidth: boolean;
    // /**
    //  * The helper text content
    //  */
    // helperText?: ReactNode;
    // /**
    //  * The id of the input element. Use this prop to make label and helperText accessible for screen readers
    //  */
    // id?: string;
    // /**
    //  * Props applied to the InputLabel element. Pointer events like onClick are enabled if and only if shrink is true
    //  */
    // InputLabelProps?: object;
    // /**
    //  * Attributes applied to the input element
    //  */
    // inputProps?: object;
}

const TextFieldComponent: FC<TextFieldProps> = ({ className }) => {
    return (
        <div className={className}>
            <TextField id="textfield" variant="outlined" />
        </div>
    );
};

export default TextFieldComponent;
