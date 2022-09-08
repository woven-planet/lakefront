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
            expect(container.querySelector('.progress-bar-fill').querySelector('span').innerHTML).toBe('86%');
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

        describe('capacity', () => {
            it('renders capacity within the progress-bar by default', () => {
                const { container } = render(<DeviceProgressBar
                    used={0}
                    available={0}
                    total={0}
                    capacity='73%'
                />);

                expect(container.querySelector('.progress-bar-bottom-text')).not.toBeInTheDocument();
                expect(container.querySelector('.progress-bar-fill').innerHTML).toMatch(/73%/);
            });

            it('renders capacity below the bar when capacityLocation is "below"', () => {
                const { container } = render(<DeviceProgressBar
                    used={0}
                    available={0}
                    total={0}
                    capacity='73%'
                    capacityLocation='below'
                />);

                expect(container.querySelector('.progress-bar-fill').querySelector('span')).not.toBeInTheDocument();
                expect(container.querySelector('.progress-bar-bottom-text').innerHTML).toMatch(/73%/);
            });
        });

        describe('capacity sub-text', () => {
            it('renders no subtext by default', () => {
                const { container } = render(<DeviceProgressBar
                    used={0}
                    available={0}
                    total={0}
                    capacity={0}
                />);

                expect(container.querySelector('.progress-bar-fill').querySelector('span').innerHTML).toBe('0');
            });

            it('renders custom capacity subtext when provided', () => {
                const { container } = render(<DeviceProgressBar
                    used={0}
                    available={0}
                    total={0}
                    capacity={0}
                    capacitySubText='of capacity'
                />);

                expect(container.querySelector('.progress-bar-fill').querySelector('span').innerHTML).toBe('0 of capacity');
            });
        });
    });
});
