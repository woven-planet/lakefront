import { ProgressBarContainer, TopText, CenterText, RightText, ProgressBar, Filler, BottomText } from './deviceProgressBarStyles';
import { ThemeProvider } from '@emotion/react';
import customTheme from 'src/styles/theme';

export interface DeviceProgressProps {
    used: number;
    available: number;
    total: number;
    capacity: string;
    backgroundColor?: string;
}

export const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0 || bytes === undefined) return { value: 0, size: 'B' };

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let i = Math.floor(Math.log(bytes) / Math.log(k));

    let value = (bytes / Math.pow(k, i)).toFixed(dm);
    let size = sizes[i];

    if (value === k.toFixed(dm)) {
        i = i + 1;

        value = (bytes / Math.pow(k, i)).toFixed(dm);
        size = sizes[i];
    }

    return { value: value, size: size };
};

const DeviceProgressBar: React.FC<DeviceProgressProps> = ({
    used,
    available,
    total,
    capacity,
    backgroundColor = customTheme?.colors.saturatedTeal
}) => {
    const formattedUsed = formatBytes(used);
    const formattedAvailable = formatBytes(available);
    const formattedTotal = formatBytes(total);

    const usedResult = `${formattedUsed.value} ${formattedUsed.size}`;
    const availableResult = `${formattedAvailable.value} ${formattedAvailable.size}`;
    const totalResult = `${formattedTotal.value} ${formattedTotal.size}`;

    return (
        <ThemeProvider theme={customTheme}>
            <ProgressBarContainer>
                <>
                    <TopText>
                        <span>Used: {usedResult}</span>
                        <CenterText>Available: {availableResult}</CenterText>
                        <RightText>Total: {totalResult}</RightText>
                    </TopText>
                    <ProgressBar >
                        <Filler width={capacity} backgroundColor={backgroundColor} />
                    </ProgressBar>
                    <BottomText>
                        <span>{capacity} Full</span>
                    </BottomText>
                </>
            </ProgressBarContainer>
        </ThemeProvider>
    );
};

export default DeviceProgressBar;
