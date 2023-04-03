import { FC } from 'react';
import { Button } from '@mui/material';

export interface ButtonProps {
    className?: string;
}

const ButtonComponent: FC<ButtonProps> = ({ className }) => {
    return (
        <div className={className}>
            <Button>This is a button</Button>
        </div>
    );
};

export default ButtonComponent;
