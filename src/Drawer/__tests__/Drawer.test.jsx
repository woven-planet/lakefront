import React from 'react';
import { fireEvent, getByText, render } from '@testing-library/react';
import Drawer from '../Drawer';

const PROPS = {
    open: true,
    width: '50%'
};

describe('Drawer Open', () => {
    it('Drawer opens properly', () => {
        const { container } = render(<Drawer {...PROPS} />);
        expect(container.querySelector('div.innerDrawerContainer')).toBeInTheDocument();
        expect(container.querySelector('div')).toHaveStyle({ marginRight: '0' });
    });

    it('hides the drawer when false', () => {
        const { container } = render(<Drawer open={false} />);
        expect(container.querySelector('div')).toHaveStyle({ marginRight: '-50%' });
    });


    it('calls the onClose action on button click', () => {
        const onClose = jest.fn();
        const { getByRole } = render(<Drawer {...PROPS} onClose={onClose} />);
        
        fireEvent.click(getByRole('button'));
        
        expect(onClose).toHaveBeenCalled();
    });

    it('Drawer renders child component', () => {
        var children = "<div>This is child component</div>";
        const { container } = render(<Drawer {...PROPS} children={children}/>);
        expect(container).toContainHTML("&lt;div&gt;This is child component&lt;/div&gt;");
    });
    
});
