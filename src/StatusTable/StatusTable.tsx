import { FC } from 'react';
import { StatusTableStyle } from './statusTableStyles';
import { ReactComponent as UnfoldMoreIcon } from './__assets__/UnfoldMoreIcon.svg';
import { v4 as uuid } from 'uuid';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

export interface StatusTableHeader {
    name: string;
    field?: string;
    sortable: boolean;
}

export interface StatusTableProps {
    headers: StatusTableHeader[];
    handleSort?: (field: string) => void;
    cards?: boolean;
    className?: string;
}

const StatusTable: FC<StatusTableProps> = (
    {
        children,
        handleSort,
        headers,
        cards,
        className
    }) => {
    if (cards) {
        return (
            <ThemeProvider theme={theme}>
                <StatusTableStyle classname={className} StatusTableCard={true}>
                    <table>
                        <tbody>
                            {children}
                        </tbody>
                    </table>
                </StatusTableStyle>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <StatusTableStyle className={className} StatusTableCard={false}>
                <table>
                    <thead>
                        <tr>
                            {
                                headers.map(({ name, field = '', sortable }) => (
                                    <th key={uuid()}>
                                        <div
                                            onClick={sortable && handleSort ?
                                                () => handleSort(field) :
                                                undefined}
                                        >
                                            {name}
                                            {
                                                sortable && <UnfoldMoreIcon />
                                            }
                                        </div>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </StatusTableStyle>
        </ThemeProvider>
    );
};

export default StatusTable;
