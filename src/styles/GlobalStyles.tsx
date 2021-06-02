import { FC } from 'react';
import { css, Global } from '@emotion/react';

const styles = css({
    '*': {
        fontFamily: '"Source Sans Pro", sans-serif'
    }
});

const GlobalStyles: FC = ({ children }) => {
    return (
        <>
            <Global styles={styles} />
            {children}
        </>
    );
};

export default GlobalStyles;
