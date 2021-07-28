import '@emotion/react';
import colors from 'src/styles/lakefrontColors';
import borders from 'src/styles/borders';

type ColorsType = typeof colors;
type BordersType = typeof borders;

declare module '@emotion/react' {
    export interface Theme {
        colors: ColorsType,
        borders: BordersType
    }
}
