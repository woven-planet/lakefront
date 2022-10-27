import { css, Theme } from '@emotion/react';
import { lightenDarkenColor } from 'src/styles/stylesUtil';
import { ComponentStyles } from './buttonUtil';

const MAIN_STYLES = {
    border: 'none',
    minWidth: 0,
    height: 48,
    width: 48,
    borderRadius: '100%'
};

interface GetIconStylesProps {
    theme?: Theme;
    alternate?: boolean;
    disabled?: boolean;
}


export const getIconStyles = ({ alternate, disabled, theme }: GetIconStylesProps): ComponentStyles => {
    const primaryBackground = lightenDarkenColor(alternate ? theme?.colors?.white : theme?.colors?.storm, -10);
    const secondaryBackground = disabled ? 'transparent' : lightenDarkenColor(theme?.colors?.white, -10);
    const destructiveBackground = alternate ?
        lightenDarkenColor(theme?.colors?.saturatedRed, -10) :
        theme?.colors?.saturatedRed;

    return {
        primary: css({
            ...MAIN_STYLES,
            ...(!disabled && {
                ':hover': {
                    backgroundColor: primaryBackground
                }
            })
        }),
        secondary: css({
            ...MAIN_STYLES,
            ...(!disabled && {
                ':hover': {
                    backgroundColor: secondaryBackground
                }
            })
        }),
        destructive: css({
            ...MAIN_STYLES,
            ...(!disabled && {
                ':hover': {
                    backgroundColor: destructiveBackground,
                    span: {
                        color: theme?.colors?.white
                    }
                }
            }),
            border: `1px solid ${theme?.colors?.saturatedRed}`
        })
    };
};
