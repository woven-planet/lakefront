import styled from '@emotion/styled';
interface StatusTableStyleProps {
    cards?: boolean;
}

interface StatusProps {
    status?: string;
    onRowClick?: () => void;
    rowClick?: boolean;
}

export const StatusTableStyle = styled.div<StatusTableStyleProps>(({ cards, theme }) => ({
    'table': {
        borderCollapse: 'separate',
        borderSpacing: 0,
        width: '100%'
    },

    'th': {
        color: theme?.colors?.storm,
        fontSize: '14px',
        fontWeight: 400,
        padding: '12px 12px 8px 12px',
        position: 'sticky',
        textAlign: 'left',
        top: 0,
        whiteSpace: 'nowrap',
        zIndex: 2,

        '&:first-of-type': {
            paddingLeft: '20px'
        },

        'svg': {
            fontSize: '18px'
        },

        'div': {
            cursor: 'pointer',
            display: 'flex'
        }
    },
    ...(cards && {

        borderSpacing: 0,

        '&:first-of-type': {
            'tr': {
                '&:hover': {
                    backgroundColor: theme?.colors?.white
                }
            }
        },

        'td': {
            borderBottom: '1px solid',
            borderBottomColor: theme?.colors?.mercury,

            '&:first-of-type': {
                borderLeft: '1px solid',
                borderBottomColor: theme?.colors?.mercury
            },

            '&:last-of-type': {
                borderRight: '1px solid',
                borderBottomColor: theme?.colors?.mercury
            }
        },

        'h5': {
            marginBlockStart: '0px',
            marginBlockEnd: '5px',
            color: theme?.colors?.black,
            fontSize: '14px',
            fontWeight: '600'
        }

    })
}));

export const DividerRow = styled.tr({
    height: '7px',
    opacity: '0'
});

export const StatusCellBadgeStyle = styled.div<StatusProps>(({ status, theme }) => ({
    paddingLeft: '24px',

    ':before': {
        borderRadius: '16px',
        content: '""',
        height: '16px',
        left: '10px',
        position: 'absolute',
        top: '33%',
        width: '16px'
    },

    ...((status === 'Running') && {
        '&:before': {
            backgroundColor: theme?.colors?.teal
        }
    }),

    ...((status === 'Enqueued') && {
        '&:before': {
            backgroundColor: theme?.colors?.mercury
        }
    }),

    ...(((status === 'Failed') || (status === 'Error')) && {
        '&:before': {
            backgroundColor: theme?.colors?.red
        }
    })
}));

export const StatusRowStyle = styled.tr<StatusProps>(({ status, onRowClick, rowClick, theme }) => ({
    backgroundColor: theme?.colors?.white,

    '&:hover': {
        backgroundColor: theme?.colors?.akoya,
    },

    '&:last-of-type': {
        'td': {
            borderBottom: '1px solid',
            borderBottomColor: theme?.colors?.mercury
        }
    },

    'td': {
        borderTop: '1px solid',
        borderTopColor: theme?.colors?.mercury,

        '&:first-of-type': {
            borderLeft: '1px solid',
            borderLeftColor: theme?.colors?.mercury,
            paddingLeft: '20px',

            '&:before': {
                content: '""',
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '9px'
            }
        },

        '&:last-of-type': {
            borderRight: '1px solid',
            borderRightColor: theme?.colors?.mercury
        },

        color: theme?.colors?.grey30,
        padding: '12px',
        position: 'relative'
    },

    ...((status === 'Running') && {
        'td:first-of-type': {
            '&:before': {
                backgroundColor: theme?.colors?.teal
            }
        }
    }),

    ...((status === 'Enqueued') && {
        'td:first-of-type': {
            '&:before': {
                backgroundColor: theme?.colors?.mercury
            }
        }
    }),

    ...(((status === 'Failed') || (status === 'Error')) && {
        'td:first-of-type': {
            '&:before': {
                backgroundColor: theme?.colors?.red
            }
        }
    }),

    ...(rowClick && {
        cursor: 'pointer'
    }
    )

}));
