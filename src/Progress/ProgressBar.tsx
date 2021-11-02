import { ProgressStyle, ProgressSpan } from './progressBarStyles';
import { ThemeProvider } from '@emotion/react';
import customTheme from 'src/styles/theme';

export interface ProgressBarProps {
    total: number;
    width: number;
    data: {
        label: string;
        value: number;
    }[];
    theme: {
        [key: string]: {
            bgColor: string;
            fgColor: string;
        };
    };
}


const ProgressBar: React.FC<ProgressBarProps> = ({ data, theme, total, width }) => {

    let leftPosition = 0;

    return (
        <ThemeProvider theme={customTheme}>
            <ProgressStyle width={width}>
                {data.map(({ label, value }) => {
                    if (label === 'pending' || value === 0) {
                        return null;
                    }

                    // compute the width of the bar, and increment the left position
                    const barWidth = total > 0 ? (value / total) * width : 0;
                    leftPosition += barWidth;
                    const color = theme[label] ? theme[label].bgColor : '#e1e1e8';

                    return (
                        <ProgressSpan
                            key={label}
                            title={`${label}: ${value}`}
                            left={leftPosition - barWidth}
                            backgroundColor={color}
                            width={barWidth}
                        />
                    );
                })}
            </ProgressStyle>
        </ThemeProvider>
    );
};

export default ProgressBar;
