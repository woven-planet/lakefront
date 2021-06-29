import '@emotion/react';
import colors from 'core/styles/cloudColors';
import colors from 'core/styles/borders';
type ColorsType = typeof colors;
type BordersType = typeof borders;

declare module '@emotion/react' {
    export interface Theme {
        colors: ColorsType,
        borders: BordersType
    }
}
