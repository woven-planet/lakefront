import { render, fireEvent, cleanup } from '@testing-library/react';

import SpeedInput, { SPEED_UNITS, Mode, VehicleSpeed } from '../SpeedInput';

afterAll(cleanup);

const options = [
    {
        label: 'Min',
        value: '1'
    },
    {
        label: 'max',
        value: '50'
    },
    {
        label: 'unit',
        value: 'Mph'
    },
    {
        label: 'unit',
        value: 'Kph'
    }
];
describe('<SpeedInput>', () => {

    it('Should exist', () => {
        const speedInput = render(<SpeedInput />);
        expect(speedInput).toBeDefined();
    });

    it('renders disabled', () => {
        const { container } = render(
            <SpeedInput disabled={true} />
        );
        const speedInputContainer = container.querySelectorAll('div');
        expect(speedInputContainer).toBeDisabled;
    });

    it('Takes in all props', () => {
        const callback = jest.fn();
        const { container, getByText } = render(
            <SpeedInput
                value={VehicleSpeed}
                unitConversionRequired={true}
                allowNegativeInput={true}
                defaultUnits={SPEED_UNITS}
                onChange={callback}
            />
        );
        expect(container).toBeInTheDocument;
        const icon = container.querySelectorAll('div');
        expect(icon).toBeDefined;

        expect(getByText('Min')).toBeInTheDocument() && (options[0].value).toEqual('1');
        expect(getByText('Max')).toBeInTheDocument() && (options[1].value).toEqual('50');
        expect(getByText('Mph')).toBeInTheDocument() && (options[2].value).toEqual('Mph');
        expect(getByText('Kph')).toBeInTheDocument() && (options[3].value).toEqual('Kph');

        expect(SpeedInput.value).not.toBeNull();
        expect(SpeedInput.unitConversionRequired).not.toEqual(false);
        expect(SpeedInput.allowNegativeInput).not.toEqual(false);
        expect(SPEED_UNITS.kilometersPerHour).toEqual('Kph');
        expect(SPEED_UNITS.metersPerSecondSquared).toEqual('m/s²');
        expect(SPEED_UNITS.milesPerHour).toEqual('Mph');

        const mphClicked = getByText(options[2].value);
        fireEvent.click(mphClicked);
        expect(callback.mphClicked).not.toEqual(options[3].value);

        const kphStaysKph = getByText(options[3].value);
        fireEvent.click(kphStaysKph);
        expect(SPEED_UNITS.kilometersPerHour).toEqual(options[3].value);
    });
});
