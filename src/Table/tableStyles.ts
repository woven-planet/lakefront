import styled from '@emotion/styled';

export const TableStyle = styled.table(({ theme }) => ({
    padding: 0,
    margin: 0,
    borderSpacing: 0,
    width: '100%',
    'tr': {
        color: theme?.colors?.arsenic,
        ':last-child': {
            'td': {
                borderBottom: 0,
            }
        }
    },
    'th': {
        color: theme?.colors?.pavement,
        position: 'relative',
        textAlign: 'left',
        'svg': {
            marginTop: '2px',
            position: 'absolute',
            top: '6px'
        }
    },
    'th,td': {
        margin: 0,
        padding: '0.8rem',
        borderBottom: '1px solid',
        borderBottomColor: theme?.colors?.selago,

        '&.noBorder': {
            borderBottom: 0,
            padding: '0.4rem'
        },

        '&.marginBottom': {
            marginBottom: '5px'
        }
    }
}));
