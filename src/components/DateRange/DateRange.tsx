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
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);
    const [range, setRange] = useState<{ startValue: Moment | null, endValue: Moment | null }>({
        startValue: null, endValue: null
    });
    const datePickerPosition = useMemo(() => {
        if (wrapperElement) {
            const inputElement = wrapperElement.getElementsByTagName('input')[0];
            const { top, left } = inputElement.getBoundingClientRect();

            return {
                top: top + INPUT_HEIGHT,
                left
            }
        }

        return {
            top: 0,
            left: 0
        }
    }, [wrapperElement]);

    const setValue = (startOrEnd: 'start' | 'end', newValue: Moment | null) => {
        setRange(prev => ({
            ...prev,
            [startOrEnd === 'start' ? 'startValue' : 'endValue']: newValue
        }));
    };

    const handleWrapperMount = (node: HTMLElement | null) => {
        if (node) {
            setWrapperElement(node);
        }
    };

    return <LocalizationProvider
        dateAdapter={AdapterMoment}
        localeText={{ start, end }}
    >
        <div
            ref={handleWrapperMount}
        >
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
                            top: datePickerPosition.top,
                            left: datePickerPosition.left
                        }
                    }
                }}
            />
            <DatePicker
                label={end}
                value={range.startValue}
                onChange={(newValue) => {
                    setValue('end', newValue);
                }}
            />
        </div>
    </LocalizationProvider>;
};

export default DateRange;