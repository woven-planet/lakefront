import '@emotion/react';
import colors from 'core/styles/cloudColors';
type ColorsType = typeof colors;

declare module '@emotion/react' {
    export interface Theme {
        colors: ColorsType
    }
}
