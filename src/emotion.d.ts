import '@emotion/react';
import colors from 'src/styles/lakefrontColors';
import borders from 'src/styles/borders';
import zIndex from 'src/styles/zIndex';

type ColorsType = typeof colors;
type BordersType = typeof borders;
type ZIndexType = typeof zIndex;

declare module '@emotion/react' {
    export interface Theme {
        colors: ColorsType,
        borders: BordersType,
        zIndex: ZIndexType,
    }
}
