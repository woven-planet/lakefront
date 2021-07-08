import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextSearch from '../TextSearch';

describe('<TextSearch />', () => {
    it('renders input text', () => {
        const { getByRole } = render(<TextSearch />);

        getByRole('textbox');
    });

    it('onChange callback does not fire on input change', () => {
        const changeCallback = jest.fn();
        const { getByRole } = render(<TextSearch onChange={changeCallback} />);
        fireEvent.change(getByRole('textbox'), { target: { value: 'asdf' } });
        expect(changeCallback).not.toBeCalled();
    });

    it('onChange callback fires on blur change', () => {
        const changeCallback = jest.fn();
        const { getByRole } = render(<TextSearch onChange={changeCallback} />);
        fireEvent.blur(getByRole('textbox'), { target: { value: 'asdf' } });
        expect(changeCallback).toBeCalledWith('asdf');
    });

    it('onChange callback fires on enter key press', () => {
        const changeCallback = jest.fn();
        const { getByRole } = render(<TextSearch onChange={changeCallback} />);
        fireEvent.keyPress(getByRole('textbox'), { key: 'Enter', charCode: 13, target: { value: 'asdf' } });
        expect(changeCallback).toBeCalledWith('asdf');
    });
});
