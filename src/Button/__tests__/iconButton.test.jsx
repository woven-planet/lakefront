import { render } from '@testing-library/react';
import IconButton from '../IconButton';
import { getIconStyles } from '../iconButtonVariants';

describe('IconButton', () => {
    const ICON_NAME = 'add';
    const TEXT_ID = 'textId';
    const POSITIONS = {
        LEFT: 'left',
        RIGHT: 'right'
    };

    it(`renders the icon and children in the proper order when position is '${POSITIONS.LEFT}'`, () => {
        const { getByText } = render(
            <IconButton icon={ICON_NAME} iconPosition={POSITIONS.LEFT}>
                <div id={TEXT_ID}>{TEXT_ID}</div>
            </IconButton>
        );

        expect(getByText(ICON_NAME)).toBeInTheDocument();
        expect(getByText(TEXT_ID).parentNode.parentNode).toHaveStyle({ flexDirection: 'row' });
    });

    it(`renders the icon and children in the proper order when position is '${POSITIONS.RIGHT}`, () => {
        const { getByText } = render(
            <IconButton icon={ICON_NAME} iconPosition={POSITIONS.RIGHT}>
                <div id={TEXT_ID}>{TEXT_ID}</div>
            </IconButton>
        );

        expect(getByText(ICON_NAME)).toBeInTheDocument();
        expect(getByText(TEXT_ID).parentNode.parentNode).toHaveStyle({ flexDirection: 'row-reverse' });
    });
});

describe('getIconStyles', () => {
    const THEME = {
        colors: {
            white: 'white',
            storm: 'gray',
            saturatedRed: 'red'
        }
    };

    it('returns the correct styles when alternate is false', () => {
        expect(getIconStyles({ theme: THEME, alternate: false }).primary.styles).toContain(':hover{background-color:000000;}');
        expect(getIconStyles({ theme: THEME, alternate: false }).secondary.styles).toContain(':hover{background-color:000000;}');
        expect(getIconStyles({ theme: THEME, alternate: false }).destructive.styles).toContain(':hover{background-color:red;');
    });

    it('returns the correct styles when alternate is true', () => {
        expect(getIconStyles({ theme: THEME, alternate: true }).primary.styles).toContain(':hover{background-color:000000;}');
        expect(getIconStyles({ theme: THEME, alternate: true }).secondary.styles).toContain(':hover{background-color:000000;}');
        expect(getIconStyles({ theme: THEME, alternate: true }).destructive.styles).toContain(':hover{background-color:000000;');
    });
});
