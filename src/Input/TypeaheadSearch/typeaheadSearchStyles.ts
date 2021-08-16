import styled from '@emotion/styled';
import { INPUT_WIDTH } from 'src/Input/inputStyles';

interface TypeaheadSearchContainerProps {
    placement?: 'bottom-start' | 'bottom-end';
}

const POPOVER_WIDTH = INPUT_WIDTH * 2;

export const SearchResultsPopover = styled.div<TypeaheadSearchContainerProps>(
    ({ placement = 'bottom-start', theme }) => {
        const horizontalOffset = { [placement === 'bottom-start' ? 'left' : 'right']: 0 };

        return {
            position: 'absolute',
            marginTop: '-1em',
            ...horizontalOffset,
            border: theme?.borders?.popover,
            borderRadius: 4,
            boxShadow: '0 2px 5px 1px rgb(0 0 0 / 20%)',
            padding: '1em',
            width: POPOVER_WIDTH,
            backgroundColor: theme?.colors?.white
        };
    }
);

export const TypeaheadError = styled.div(({ theme }) => ({
    color: theme?.colors?.red
}));

export const TypeaheadResultsContainer = styled.div(({ theme }) => ({
    padding: 2,
    'div.resultsHeader': {
        color: theme?.colors?.pavement,
        textTransform: 'uppercase'
    },
    'ul.resultsList': {
        display: 'flex',
        flexDirection: 'column',
        marginInlineStart: 0,
        marginInlineEnd: 0,
        marginBlockStart: 0,
        marginBlockEnd: 0,
        paddingInlineStart: 0,
        maxHeight: 230,
        overflowY: 'auto',
        'li.resultItem': {
            marginTop: 4,
            padding: '2px 4px',
            display: 'block',
            ':hover': {
                backgroundColor: theme?.colors?.mercury,
                cursor: 'pointer'
            }
        }
    }
}));

export const TypeaheadSearchContainer = styled.div<TypeaheadSearchContainerProps>(({ theme }) => ({
    height: 40,
    'input.typeaheadInput': {
        paddingLeft: 50
    },
    'svg.typeaheadSearchIcon': {
        position: 'relative',
        top: -50,
        left: 15
    },
    'div.inputWrapper': {
        position: 'relative'
    }
}));
