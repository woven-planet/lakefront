import { getPercentage } from './playbackUtil';
import { FC } from 'react';
import { Highlight } from './playbackStyle';
import { HighlightsProp } from '../../types/global';

interface Props {
    highlights: HighlightsProp[],
    max: number
}

const HighlightSections: FC<Props> = ({ highlights, max }) => {
    return (
        <>
            {highlights && highlights.map((highlight: any) => {
                const start = getPercentage(highlight.start, max);
                const end = getPercentage(highlight.end, max);
                const left = `${start}%`;
                const width = `${end - start}%`;
                return <Highlight key={highlight.start} left={left} width={width} data-testid="highlight" />;
            })}
        </>
    );
};

export default HighlightSections;
