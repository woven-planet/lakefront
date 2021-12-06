import { FC } from 'react';
import Slider from './Slider';
import { PlaybackStyle, PlaySlider } from './playBackStyle';
import { HighlightsProp } from '../types/global';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

interface PlaybackBarProps {
    currentDuration: string;
    endDuration: string;
    currentSlider: number;
    maxSlider: number;
    setSlider(index: number): void;
    highlights: HighlightsProp[];
}

const PlaybackBar: FC<PlaybackBarProps> = props => {
    const {
        currentDuration,
        currentSlider,
        endDuration,
        highlights,
        maxSlider,
        setSlider
    } = props;

    return (
        <ThemeProvider theme={theme}>
            <PlaybackStyle>
                <PlaySlider>
                    <span>{currentDuration}</span>
                    <Slider
                        value={currentSlider}
                        max={maxSlider}
                        highlights={highlights}
                        onChange={setSlider}
                    />
                    <span>{endDuration}</span>
                </PlaySlider>
            </PlaybackStyle>
        </ThemeProvider>
    );
};

export default PlaybackBar;
