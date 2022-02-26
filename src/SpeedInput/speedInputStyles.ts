import styled from '@emotion/styled';
import theme from 'src/styles/theme';

export const RadioGroupWrapper = styled.div({
    label: {
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        'input[type=radio]:not(:checked) + svg + div': {
            color: theme.colors.pavement
        },
        'input[type=radio]:checked + svg': {
            fill: theme.colors.gunpowder
        }
    },
    svg: {
        height: '16px',
        width: '16px'
    }
});

