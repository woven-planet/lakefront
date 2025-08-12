import '@emotion/react';
import colors from 'src/styles/lakefrontColors';
import borders from 'src/styles/borders';
import zIndex from 'src/styles/zIndex';

type ColorsType = typeof colors;
type BordersType = typeof borders;
type ZIndexType = typeof zIndex;

declare module '@emotion/react' {
    export interface Theme {
        colors: ColorsType;
        borders: BordersType;
        zIndex: ZIndexType;
        DARKEN_MOST: number;
        DARKEN_LEAST: number;
        textColors: {
            primary: string;
            secondary: string;
            h2: string;
            h4: string;
            error: string;
            disabled: string;
        };
        backgroundColors: {
            primary: string;
            secondary: string;
            third: string;
            fourth: string;
            fifth: string;
            primaryWidget: string;
            disabled: string;
        };
        borderColors: {
            primary: string;
            secondary: string;
            disabled: string;
            inverted: string;
        };
        buttonColors: {
            primary: string;
            secondary: string;
        };
        shadowColors: {
            boxShadow: string;
        };
        backgrounds: {
            primary: string;
            secondary: string;
            tertiary: string;
            widget: string;
            disabled: string;
            inverted: string;
        };
        foregrounds: {
            primary: string;
            secondary: string;
            error: string;
            disabled: string;
            info: string;
            warning: string;
            inverted: string;
        };
        lettering: {
            primary: {
                fontSize: number;
                fontFamily: string;
                fontWeight: number;
            };
            secondary: {
                fontSize: number;
                fontFamily: string;
                fontWeight: number;
            };
            h1: { fontSize: number; fontFamily: string; fontWeight: number };
            h2: { fontSize: number; fontFamily: string; fontWeight: number };
            h3: { fontSize: number; fontFamily: string; fontWeight: number };
            h4: { fontSize: number; fontFamily: string; fontWeight: number };
            h5: { fontSize: number; fontFamily: string; fontWeight: number };
            h6: { fontSize: number; fontFamily: string; fontWeight: number };
        };
    }
}
