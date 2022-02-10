import { FC } from 'react';
import { humanize } from 'src/lib/format.js';
import { Status } from './StatusRow';
import { StatusCellBadgeStyle } from './statusTableStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

export interface StatusCellBadgeProps {
    status: string;
    className?: string;
}

const StatusCellBadge: FC<StatusCellBadgeProps> = ({ status = Status.NONE, className }) => {
    debugger;
    const styleKey = (Status as any)[status];

    return (
        <ThemeProvider theme={theme}>
            <StatusCellBadgeStyle className={className} Status={styleKey}>
                {humanize(status)}
            </StatusCellBadgeStyle>
        </ThemeProvider>
    );
};

export default StatusCellBadge;
