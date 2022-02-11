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
    /**
     * This is to set the status.
     */
    status?: Status;
    /**
     * This is to set an external classname.
     */
    className?: string;
}

/**
 *  Status Row Component is used to render the row with various colums.
 */
const StatusRow: FC<StatusRowProps> = ({ children, status = Status.NONE, className }) => {
    return (
        <ThemeProvider theme={theme}>
            <StatusRowStyle className={className} status={status}>
                {children}
            </StatusRowStyle>
        </ThemeProvider>
    );
};

export default StatusRow;
