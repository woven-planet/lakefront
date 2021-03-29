import styled from '@emotion/styled';
import { CollapsibleProps } from './Collapsible';

export const StyledCollapsible = styled.div<CollapsibleProps>(({ theme }) => ({
    color: theme?.colors?.storm,
    display: 'flex',
    flexDirection: 'column',
    '.topCollapsible': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '.title': {
            fontWeight: 600,
            fontSize: 24
        },
        '.subtitle': {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            button: {
                marginLeft: 16,
                marginBottom: 8
            }
        }
    },
    '.divider': {
        height: 1,
        backgroundColor: theme?.colors?.selago
    },
    '.expanded': {
        height: 'auto',
        opacity: 1,
        transition: 'height 100ms ease, opacity 500ms ease',
    },
    '.collapsed': {
        height: 0,
        opacity: 0,
        transition: 'opacity 100ms ease-out, height 500ms ease-out'
    }
}));
