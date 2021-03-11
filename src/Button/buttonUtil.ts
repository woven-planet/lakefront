import { ComponentPropsWithoutRef, ElementType } from 'react';
import { SerializedStyles } from '@emotion/react';

export interface ComponentStyles {
    [key: string]: SerializedStyles
}

export enum COLORS {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DESTRUCTIVE = 'destructive'
}

export const ICON_BUTTON_COLOR: { [key: string]: 'secondary' | 'destructive' } = {
    primary: 'secondary',
    secondary: 'secondary',
    destructive: 'destructive'
};

export const ICON_NAMES = {
    primary: 'add',
    secondary: 'add',
    destructive: 'delete'
};

export class InvalidButtonColorError extends Error {
    color: string | undefined;

    constructor(color: string | undefined) {
        super(`Invalid color '${color}' was provided. Valid colors are: ${Object.values(COLORS).join(', ')}.`);
    }
}

export interface ButtonProps {
    color?: COLORS;
    alternate?: boolean;
    as?: ElementType | keyof JSX.IntrinsicElements;
    icon?: boolean;
    position?: 'left' | 'right';
}

export type ButtonComponentProps = ButtonProps & ComponentPropsWithoutRef<'button'>;

export const shouldUseMappedIcon = (props: ButtonComponentProps): boolean | undefined => {
    return props.icon && !('iconName' in props);
};
