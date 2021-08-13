import styled from '@emotion/styled';
import { INPUT_WIDTH } from 'src/Input/inputStyles';

interface TypeaheadSearchContainerProps {
    placement?: 'bottom-start' | 'bottom-end'
}

interface SearchResultsPopoverProps {
    leftPosition?: number;
    placement?: 'bottom-start' | 'bottom-end';
    topPosition?: number;
}

const POPOVER_WIDTH = INPUT_WIDTH * 2;

export const SearchResultsPopover = styled.div<SearchResultsPopoverProps>(({ leftPosition = 0, placement = 'bottom-start', theme, topPosition = 0 }) => {
    const leftOffset = placement === 'bottom-start' ? 0 : POPOVER_WIDTH;
    const left = leftPosition + leftOffset;
    const top = `${topPosition}px`
    console.log({ topPosition, leftPosition })
    return {
        position: 'absolute',
        top,
        left: 100,
        border: theme?.borders?.popover,
        borderRadius: 4,
        boxShadow: '0 2px 5px 1px rgb(0 0 0 / 20%)',
        padding: '1em',
        width: POPOVER_WIDTH,
        backgroundColor: theme?.colors?.white
    };
});

export const TypeaheadSearchContainer = styled.div<TypeaheadSearchContainerProps>(({ theme }) => ({
    height: 40,
    'input.typeaheadInput': {
        paddingLeft: 50,
    },
    'svg.typeaheadSearchIcon': {
        position: 'relative',
        top: -50,
        left: 15
    }
}));
