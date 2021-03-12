import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button from '../Button';
import { lightenDarkenColor } from '../../styles/stylesUtil';

const BUTTON_TEXT = 'buttonText';

const THEME = {
    colors: {
        white: 'white',
        storm: 'gray',
        saturatedRed: 'red'
    }
};

const onClick = jest.fn();

describe('Button', () => {
    describe('general rendering', () => {
        it('renders child text', () => {
            const { getByText } = render(<Button>{BUTTON_TEXT}</Button>);

            getByText(BUTTON_TEXT);
        });

        it('renders additional child types', () => {
            const [divID, pID] = ['divID', 'pID'];
            const { container } = render(
                <Button>
                    <div id={divID}>
                        <p id={pID}>{BUTTON_TEXT}</p>
                    </div>
                </Button>
            );

            expect(container.querySelector(`#${divID}`)).toBeInTheDocument();
            expect(container.querySelector(`#${pID}`)).toBeInTheDocument();
        });
    });

    describe('when enabled', () => {
        it('triggers button handler when clicked', () => {
            const { getByText } = render(<Button onClick={onClick}>{BUTTON_TEXT}</Button>);

            fireEvent.click(getByText(BUTTON_TEXT));

            expect(onClick).toHaveBeenCalled();
        });

        it('renders primary variant when color is undefined', () => {
            const { getByRole } = render(<Button>{BUTTON_TEXT}</Button>);

            expect(getByRole('button').className.toLowerCase()).toContain('primarybutton');
        });

        it('renders primary variant when specified', () => {
            const { getByRole } = render(<Button color="primary">{BUTTON_TEXT}</Button>);

            expect(getByRole('button').className.toLowerCase()).toContain('primarybutton');
        });

        it('renders secondary variant when specified', () => {
            const { getByRole } = render(<Button color="secondary">{BUTTON_TEXT}</Button>);

            expect(getByRole('button').className.toLowerCase()).toContain('secondarybutton');
        });

        it('renders desctructive variant when specified', () => {
            const { getByRole } = render(<Button color="destructive">{BUTTON_TEXT}</Button>);

            expect(getByRole('button').className.toLowerCase()).toContain('destructivebutton');
        });
    });

    describe('when alternate prop is provided', () => {
        it('renders the alternate primary style.', () => {
            const { getByRole } = render(
                <Button alternate color="primary" theme={THEME}>
                    {BUTTON_TEXT}
                </Button>
            );

            expect(getByRole('button')).toHaveStyle({ color: THEME.colors.storm });
        });

        it('renders the alternate secondary style.', () => {
            const { getByRole } = render(
                <Button alternate color="secondary" theme={THEME}>
                    {BUTTON_TEXT}
                </Button>
            );

            expect(getByRole('button')).toHaveStyle({ color: THEME.colors.white });
        });

        it('renders the alternate destructive style.', () => {
            const { getByRole } = render(
                <Button alternate color="destructive" theme={THEME}>
                    {BUTTON_TEXT}
                </Button>
            );

            expect(getByRole('button')).toHaveStyle({ color: THEME.colors.white });
        });
    });

    describe('when disabled', () => {
        it('renders with disabled styles', () => {
            const { getByText } = render(<Button disabled>{BUTTON_TEXT}</Button>);

            expect(getByText(BUTTON_TEXT)).toHaveStyle({ cursor: 'not-allowed' });
        });

        it('prevents button handler when clicked', () => {
            const { getByText } = render(<Button disabled>{BUTTON_TEXT}</Button>);

            fireEvent.click(getByText(BUTTON_TEXT));

            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe('when hovered', () => {
        it('renders the primary variant properly', () => {
            const { getByText } = render(<Button color="primary">{BUTTON_TEXT}</Button>);

            fireEvent.mouseOver(getByText(BUTTON_TEXT));
            expect(getByText(BUTTON_TEXT))
                .toHaveStyle({ backgroundColor: lightenDarkenColor(THEME.colors.storm, -10) });
        });

        it('renders the secondary variant properly', () => {
            const { getByText } = render(<Button color="secondary">{BUTTON_TEXT}</Button>);

            fireEvent.mouseOver(getByText(BUTTON_TEXT));
            expect(getByText(BUTTON_TEXT))
                .toHaveStyle({ backgroundColor: lightenDarkenColor(THEME.colors.white, -10) });
        });

        it('renders the destructive variant properly', () => {
            const { getByText } = render(<Button color="destructive">{BUTTON_TEXT}</Button>);

            fireEvent.mouseOver(getByText(BUTTON_TEXT));
            expect(getByText(BUTTON_TEXT))
                .toHaveStyle({ backgroundColor: lightenDarkenColor(THEME.colors.saturatedRed, -10) });
        });
    });
});
