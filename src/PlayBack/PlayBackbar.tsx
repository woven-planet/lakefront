import { FC } from 'react';
import Slider from './Slider';
import { PlaybackStyle, PlaySlider } from './playbackStyle';
import { HighlightsProp } from '../types/global';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

export interface PlaybackBarProps {
    /**
     * This is to display the current duration of the playback component.
     */
    currentDuration: string;
    /**
     * This is to display the end duration of the playback component.
     */
    endDuration: string;
    /**
     * This is to set the slider position on initial render of the playback component.
     */
    currentSlider: number;
    /**
     * This is to set the max value of the playback component.
     */
    maxSlider: number;
    /**
     * This function is called when the slider is moved.
     */
    setSlider(index: number): void;
    /**
     * This is to highlight a particular section of the playback component.
     */
    highlights: HighlightsProp[];
}

/**
 *  The Playback Component renders a slider that highlights a bar according to the start and end time. 
 *  The slider can be moved between the start point and the end point.
 */
const PlaybackBar: FC<PlaybackBarProps> = ({ currentDuration,
    currentSlider,
    endDuration,
    highlights,
    maxSlider,
    setSlider }) => {

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
