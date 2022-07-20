import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Snackbar from '../index';
import { MESSAGE_TYPES } from '../Snackbar.util';
import { ReactComponent as CloseIcon } from 'src/stories/Snackbar/assets/closeIcon.svg';

const handleButtonClick = jest.fn();
const button = <button
    alternate='true'
    className='closeIcon'
    key='close'
    aria-label='Close'
    onClick={handleButtonClick}
    icon={<CloseIcon />} 
    />;

const snackbarPropsOpen = {
    action: button,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    autoHideDuration: 4000,
    message: 'File transfer initiated.',
    onClose: () => {},
    open: true,
    type: MESSAGE_TYPES.SUCCESS
};

const snackbarPropsClosed = {
    action: button,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    autoHideDuration: 4000,
    message: 'File transfer initiated.',
    onClose: () => {},
    open: false,
    type: MESSAGE_TYPES.SUCCESS
};

describe('<Snackbar>', () => {
    it('Should render component when open is true', () => {
        const { container } = render(
            <Snackbar {...snackbarPropsOpen}/>);
        expect(container).toBeDefined();
    });

    it('Should not render snackbar when open is false', () => {
        const { container } = render(
            <Snackbar {...snackbarPropsClosed}/>);
            expect(container).toBeEmptyDOMElement();
    });

    it('Should render props with classNames when open is true', () => {
        const { getByText, container } = render(
            <Snackbar {...snackbarPropsOpen} />);
  
    // anchorOrigin placeholder
    // autoHideDuration placeholder
    
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.getElementsByClassName('snackbarContent').length).toBe(1);
    expect(container.getElementsByClassName('snackbarOpen').length).toBe(1);
    expect(container.getElementsByClassName('closeIcon').length).toBe(1);
    expect(container.getElementsByClassName('snackbarMessage').length).toBe(1);
    getByText('File transfer initiated.');
    expect(container.getElementsByClassName('snackbarIcon').length).toBe(1);
    expect(container.querySelector('svg')).toContainHTML('<svg style="fill: #45d686;" />');
    expect(container.querySelector('button')).toBeEnabled();
    expect(container.querySelectorAll('div')).toHaveLength(3);
    });

    it('Should render snackbar portal onClick of button', async () => {
        const { container, getByRole, rerender } = render(
            <Snackbar {...snackbarPropsClosed} />
            );
            // open = false
            expect(container.querySelector('button')).not.toBeInTheDocument();

        rerender(
             // open = true
                <Snackbar {...snackbarPropsOpen} />
                );
            fireEvent.click(getByRole('button'));

        expect(handleButtonClick).toHaveBeenCalled();

        await waitFor(() => {
            expect(container.getElementsByClassName('snackbarOpen').length).toBe(1);
        });
    });
});
