import React from 'react';
import { render } from '@testing-library/react';
import DeviceProgressBar from '../DeviceProgressBar';
import { mockDeviceData } from './mockDevices.data';

describe('<DeviceProgressBar />', () => {
    describe('general rendering', () => {
        it('renders default items', () => {
            const { container } = render(<DeviceProgressBar
                used={mockDeviceData.space_used}
                available={mockDeviceData.space_available}
                total={mockDeviceData.space_total}
                capacity={mockDeviceData.capacity}
            />);
            expect(container.getElementsByTagName('span')[0]).toHaveTextContent('Used: 1.07 TB');
            expect(container.getElementsByTagName('span')[1]).toHaveTextContent('Available: 184.84 GB');
            expect(container.getElementsByTagName('span')[2]).toHaveTextContent('Total: 1.25 TB');
            expect(container.getElementsByTagName('span')[3]).toHaveTextContent('86% Full');
        });
        it('tests when 0 is passed', () => {
            const { container } = render(<DeviceProgressBar
                used={0}
                available={0}
                total={0}
                capacity={0}
            />);
            expect(container.getElementsByTagName('span')[0]).toHaveTextContent('Used: 0 B');
        });
    });
});
