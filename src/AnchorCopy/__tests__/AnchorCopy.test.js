import { fireEvent, render } from '@testing-library/react';
import AnchorCopy from '../AnchorCopy';

describe('AnchorCopy', () => {
    const title = 'Title Here';

    it('renders properly', () => {
        const { container } = render(<AnchorCopy title={title} />);

        expect(container.querySelector(`div[data-tip="Copy link to ${title}"]`)).toBeInTheDocument();
    });

    it('calls onCopy with correct payload when provided only title', () => {
        const onCopy = jest.fn();
        const { getByRole } = render(<AnchorCopy title={title} onCopy={onCopy} />);

        jest.spyOn(window, 'prompt').mockImplementation(() => ({
            prompt: () => null
        }));

        fireEvent.click(getByRole('button'));

        expect(onCopy).toHaveBeenCalledWith(`http://localhost/#${title.replace(' ', '%20')}`);
    });

    it('calls onCopy with correct payload when provided title and hashId', () => {
        const onCopy = jest.fn();
        const { getByRole } = render(<AnchorCopy title={title} hashId="go-here" onCopy={onCopy} />);

        jest.spyOn(window, 'prompt').mockImplementation(() => ({
            prompt: () => null
        }));

        fireEvent.click(getByRole('button'));

        expect(onCopy).toHaveBeenCalledWith('http://localhost/#go-here');
    });
});
