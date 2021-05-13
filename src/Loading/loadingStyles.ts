import styled from '@emotion/styled';
import { keyframes } from "@emotion/core";
import { LoadingProps } from './Loading';


const spinLogo = keyframes` 
    spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const StyledLoadingContainer = styled.div<LoadingProps>(
    ({ theme }) => ({
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        svg: {
            animation: `${spinLogo} 2s linear infinite`,
            marginLeft: 5,
            marginRight: 10,
            path: {
                fill: theme?.colors?.$akoya
            }
        },
        div: {
            color: theme?.colors?.$akoya,
            paddingTop: 8,
        }
    })
);

// @import 'core/styles/cloudColors';

// .refreshProgressContainer {
//     display: inline-flex;
//     flex-direction: column;
//     align-items: center;

//     @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//     }

//     svg {
//         animation: spin 2s linear infinite;
//         margin-left: 5px;
//         margin-right: 10px;

//         path {
//             fill: $akoya;
//         }
//     }

//     div {
//         color: $akoya;
//         padding-top: 8px;
//     }
// }
