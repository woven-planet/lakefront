import React from 'react';
import theme from 'src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { ItemStyleContainer } from './itemResultsStyles';

export interface ItemResultsProps {
    dataLength: number;
    totalItems: number;
}

const ItemResults: React.FC<ItemResultsProps> = ({ dataLength, totalItems }) => {
    const digitGroupSeparator = (number: number) => {
        if (number && typeof number === 'number') {
            return number.toLocaleString();
        }
        return '0';
    };

    const current = digitGroupSeparator(dataLength);
    const total = digitGroupSeparator(totalItems);

    return (
        <ThemeProvider theme={theme}>
            <ItemStyleContainer>
                {dataLength > 0 && totalItems > 0 ? `1 - ${current} of ${total}` : '0 results'}
            </ItemStyleContainer>
        </ThemeProvider>
    );
};

export default ItemResults;
