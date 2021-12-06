import { getPercentage } from './playBackUtil';
import { Highlight } from './playBackStyle';

const HighlightSections = (highlights: any, max: any) => {
    return (
        <>
            {highlights && highlights.map((highlight: any) => {
                const start = getPercentage(highlight.start, max);
                const end = getPercentage(highlight.end, max);
                const left = `${start}%`;
                const width = `${end - start}%`;

                return <Highlight key={highlight.start} left={left} width={width} />;
            })}
        </>
    );
};

export default HighlightSections;
