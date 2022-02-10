import { FC } from 'react';;
import { StatusRowStyle } from './statusTableStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

export enum Status {
    RUNNING = "Running",
    ENQUEUED = "Enqueued",
    ERROR = "Error",
    FAILED = "Failed",
    NONE = "None"
}

export interface StatusRowProps {
    status?: Status;
    className?: string;
}

const StatusRow: FC<StatusRowProps> = ({ children, status = Status.NONE, className }) => {
    return (
        <ThemeProvider theme={theme}>
            <StatusRowStyle className={className} Status={status}>
                {children}
            </StatusRowStyle>
        </ThemeProvider>
    );
};

export default StatusRow;
