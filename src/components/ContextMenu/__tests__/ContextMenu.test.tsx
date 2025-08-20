import { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContextMenu, { MenuItem } from '../ContextMenu';
import { ThemeProvider } from '@emotion/react';
import theme from '../../../styles/theme';

jest.mock('src/lib/hooks/usePopover', () => ({
    __esModule: true,
    default: () => ({ portal: null }),
    PopoverContent: ({ children }: {children: ReactNode}) => <>{children}</>,
}));

describe('ContextMenu', () => {
    const mockMenuItems: MenuItem[] = [
        { label: 'Edit', onClick: jest.fn() },
        { label: 'Copy', onClick: jest.fn() },
        { isSeparator: true },
        { label: 'Delete', onClick: jest.fn(), disabled: true },
    ];

    const TestComponent = () => (
        <ThemeProvider theme={theme}>
            <ContextMenu menuItems={mockMenuItems}>
                <div data-testid="trigger-element">Right-click me</div>
            </ContextMenu>
        </ThemeProvider>
    );

    beforeEach(() => {
        mockMenuItems.forEach(item => {
            if (!item.isSeparator) {
                (item.onClick as jest.Mock).mockClear();
            }
        });
    });

    test('renders children and does not show the menu by default', () => {
        const {getByTestId, queryByText} = render(<TestComponent />);

        expect(getByTestId('trigger-element')).toBeInTheDocument();

        expect(queryByText('Edit')).not.toBeInTheDocument();
        expect(queryByText('Copy')).not.toBeInTheDocument();
    });

    test('shows the menu with correct items on right-click', () => {
        const {getByText, getByTestId} = render(<TestComponent />);
        const trigger = getByTestId('trigger-element');

        fireEvent.contextMenu(trigger);

        expect(getByText('Edit')).toBeInTheDocument();
        expect(getByText('Copy')).toBeInTheDocument();
        expect(getByText('Delete')).toBeInTheDocument();
    });

    test('calls the correct onClick handler when a menu item is clicked and then closes the menu', () => {
        const {getByTestId, getByText, queryByText} = render(<TestComponent />);
        const trigger = getByTestId('trigger-element');

        fireEvent.contextMenu(trigger);

        const copyButton = getByText('Copy');
        fireEvent.click(copyButton);

        const copyOnClick = mockMenuItems[1].onClick as jest.Mock;
        expect(copyOnClick).toHaveBeenCalledTimes(1);

        const editOnClick = mockMenuItems[0].onClick as jest.Mock;
        expect(editOnClick).not.toHaveBeenCalled();

        expect(queryByText('Copy')).not.toBeInTheDocument();
    });

    test('does not call onClick for a disabled menu item', () => {
        const {getByTestId, getByText } = render(<TestComponent />);
        const trigger = getByTestId('trigger-element');

        fireEvent.contextMenu(trigger);

        const deleteButton = getByText('Delete');
        fireEvent.click(deleteButton);

        const deleteOnClick = mockMenuItems[3].onClick as jest.Mock;
        expect(deleteOnClick).not.toHaveBeenCalled();

        expect(getByText('Delete')).toBeInTheDocument();
    });

    test('closes the menu when clicking outside', () => {
        const {getByTestId, getByText, queryByText} = render(
            <div>
                <div data-testid="outside-element">Outside</div>
                <TestComponent />
            </div>
        );
        const trigger = getByTestId('trigger-element');

        fireEvent.contextMenu(trigger);
        expect(getByText('Edit')).toBeInTheDocument();

        const outsideElement = getByTestId('outside-element');
        fireEvent.mouseDown(outsideElement);

        expect(queryByText('Edit')).not.toBeInTheDocument();
    });
});
