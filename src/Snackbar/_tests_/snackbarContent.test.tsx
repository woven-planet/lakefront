import { render } from '@testing-library/react';
import SnackbarContent from '../SnackbarContent';
import { MESSAGE_TYPES } from '../Snackbar.util';

const SnackbarContentPropsMock = {
    action: <button />,
    message: 'File transfer initiated.',
    type: MESSAGE_TYPES.SUCCESS
};

describe('SnackbarContent', () => {
    it('should render component as expected', () => {
        const { container } = render(<SnackbarContent {...SnackbarContentPropsMock} />);
        expect(container).toBeDefined();
    });

    it('should render component with array of actions', () => {
        const { container, getByText } = render(
            <SnackbarContent {...SnackbarContentPropsMock} action={[<button />, <div />]} />
        );
        getByText('File transfer initiated.');
        expect(container.querySelector('svg')).toContainHTML('style="fill: #45d686;"');
    });
});
