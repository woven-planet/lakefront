import { FC } from 'react';
import { TextField } from '@mui/material';

export interface TextFieldProps {
    /**
     * The classes to pass to the component.
     */
    className?: string;
}

const TextFieldComponent: FC<TextFieldProps> = ({ className }) => {
    return (
        <div className={className}>
            hi
            <TextField id="textfield" variant="outlined" />
        </div>
    );
};

export default TextFieldComponent;
