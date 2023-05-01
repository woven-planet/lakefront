import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FC, useMemo, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Moment } from 'moment-timezone';
import { TextFieldProps } from '@mui/material/TextField';
import Input from '../Input';
import { INPUT_HEIGHT } from '../Input/inputStyles';

export interface DateRangeProps {
    labels?: {
        start: string; end: string;
    };
}

const DEFAULT_LABELS = {
    start: 'Start', end: 'End'
};

const DateInput = ({ inputProps, InputProps, inputRef, error, ...other }: TextFieldProps) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
                ref={inputRef}
                {...inputProps}
                {...(other as any)}
                error={error ? 'there was an error' : undefined}
            />
            {InputProps?.endAdornment}
        </div>
    );
};

const DateRange: FC<DateRangeProps> = ({
    labels: {
        start, end
    } = DEFAULT_LABELS
}) => {
    const [startWrapperElement, setStartWrapperElement] = useState<HTMLElement | null>(null);
    const [endWrapperElement, setEndWrapperElement] = useState<HTMLElement | null>(null);
    const [range, setRange] = useState<{ startValue: Moment | null, endValue: Moment | null }>({
        startValue: null, endValue: null
    });

    const [startPopperPosition, endPopperPosition] = useMemo(() => {
        let startPosition = { top: 0, left: 0 };
        let endPosition = { top: 0, left: 0 };

        if (startWrapperElement) {
            const inputElement = startWrapperElement.getElementsByTagName('input')[0];
            const { top, left } = inputElement.getBoundingClientRect();

            startPosition = {
                top: top + INPUT_HEIGHT,
                left
            }
        }

        if (endWrapperElement) {
            const inputElement = endWrapperElement.getElementsByTagName('input')[0];
            const { top, left } = inputElement.getBoundingClientRect();

            endPosition = {
                top: top + INPUT_HEIGHT,
                left
            }
        }

        return [startPosition, endPosition];
    }, [startWrapperElement, endWrapperElement]);

    const setValue = (startOrEnd: 'start' | 'end', newValue: Moment | null) => {
        setRange(prev => ({
            ...prev,
            [startOrEnd === 'start' ? 'startValue' : 'endValue']: newValue
        }));
    };

    const handleStartWrapperMount = (node: HTMLElement | null) => {
        if (node) {
            setStartWrapperElement(node);
        }
    };

    const handleEndWrapperMount = (node: HTMLElement | null) => {
        if (node) {
            setEndWrapperElement(node);
        }
    };

    return <LocalizationProvider
        dateAdapter={AdapterMoment}
        localeText={{ start, end }}
    >
        <div ref={handleStartWrapperMount}>
            <DatePicker
                label={start}
                value={range.startValue}
                onChange={(newValue) => {
                    setValue('start', newValue);
                }}
                slots={{
                    textField: DateInput
                }}
                slotProps={{
                    popper: {
                        style: {
                            top: startPopperPosition.top,
                            left: startPopperPosition.left
                        }
                    }
                }}
            />
        </div>
        <div ref={handleEndWrapperMount}>
            <DatePicker
                label={end}
                value={range.startValue}
                onChange={(newValue) => {
                    setValue('end', newValue);
                }}
                slots={{
                    textField: DateInput
                }}
                slotProps={{
                    popper: {
                        style: {
                            top: endPopperPosition.top,
                            left: endPopperPosition.left
                        }
                    }
                }}
            />
        </div>
    </LocalizationProvider>;
};

export default DateRange;