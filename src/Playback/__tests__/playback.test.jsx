import { render, fireEvent, cleanup } from '@testing-library/react';
import PlaybackBar from '../Playbackbar';

afterAll(cleanup);

describe('<PlaybackBar>', () => {
    beforeEach(cleanup);

    it('renders fine with highlights', () => {
        const changeCallback = jest.fn();

        const { getByTestId } = render(
            <PlaybackBar
                currentDuration={'00:30'}
                currentSlider={100}
                endDuration={'05:15'}
                highlights={[{ start: 50, end: 300, playback: true }]}
                setSlider={changeCallback}
                maxSlider={720}
            />
        );

        fireEvent.click(getByTestId('slider'), { clientX: '256' });
        expect(changeCallback).toBeCalled();
    });

    it('renders fine with highlights', () => {


        const { getByTestId } = render(
            <PlaybackBar
                currentDuration={'00:30'}
                currentSlider={100}
                endDuration={'05:15'}
                highlights={[{ start: 50, end: 300, playback: true }]}
                setSlider={() => null}
                maxSlider={720}
            />
        );
        getByTestId("highlight").hasAttribute("position:'absolute'");
    });
});
