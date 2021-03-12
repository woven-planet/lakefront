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
    /**
     * Determines the style of the button: primary, secondary, or destructive.
     */
    color?: COLORS;
    /**
     * Provides an alternate color theme for use on darker backgrounds.
     */
    alternate?: boolean;
    /**
     * An emotion prop that allow for changing the type of element. It can be a simple string
     * with an HTML element such as "a", or even a complex component such as a react router Link.
     */
    as?: ElementType | keyof JSX.IntrinsicElements;
    /**
     * When true, the default icon for a color type will be inserted at the iconPosition prop's location.
     * Primary and Secondary colors have a plus/add icon, and destructive has a garbage can/delete icon.
     */
    icon?: boolean;
    /**
     * Where the default icon should be in relation to the text.
     */
    iconPosition?: 'left' | 'right';
}

export type ButtonComponentProps = ButtonProps & ComponentPropsWithoutRef<'button'>;

export const shouldUseMappedIcon = (props: ButtonComponentProps): boolean | undefined => {
    return props.icon && !('iconName' in props);
};
