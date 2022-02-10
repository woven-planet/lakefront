import { FC, ReactNode } from 'react';
import { DividerRow } from './statusTableStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

export interface StatusCardProps {
    statusRow: ReactNode;
    bottomRow: ReactNode;
    className?: string;
}

const StatusCard: FC<StatusCardProps> = ({ statusRow, bottomRow, className }) => {
    return (
        <ThemeProvider theme={theme}>
            {statusRow}
            <tr className={className}>{bottomRow}</tr>
            <DividerRow />
        </ThemeProvider>
    );
};

export default StatusCard;
