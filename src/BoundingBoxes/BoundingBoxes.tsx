import { FC, useEffect, useRef, useMemo } from 'react';

import { BoundingBoxesContainer } from './boundingBoxesStyles';
import { BoundingBoxItemProp, drawSingleBox, getImageOffsetRatio } from './boundingBoxesUtil';

export interface BoundingBoxesProps {
    activeBBox: string;
    boundingBoxItems: BoundingBoxItemProp[];
    className?: string;
    imageWidth: number;
    imageHeight: number;
    outputWidth: number;
    outputHeight: number;
}

const BoundingBoxes: FC<BoundingBoxesProps> = ({
    activeBBox,
    boundingBoxItems,
    className,
    imageWidth,
    imageHeight,
    outputWidth,
    outputHeight
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawBoundingBoxes = () => {
        const currentCanvas = canvasRef.current;
        if (!currentCanvas) {
            return;
        }

        const ctx = currentCanvas.getContext('2d');

        if (ctx) {
            // clear drawing canvas first
            ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);

            if (boundingBoxItems.length > 0) {
                if (activeBBox === '') {
                    // draw all bbox items
                    boundingBoxItems.forEach((bboxItem) => {
                        drawSingleBox(ctx, bboxItem);
                    });
                } else {
                    // just draw active bbox item
                    const activeItem = boundingBoxItems.find((item) => item.name === activeBBox);
                    if (activeItem) {
                        drawSingleBox(ctx, activeItem);
                    }
                }
            }
        }
    };

    useEffect(() => {
        drawBoundingBoxes();
    }, [activeBBox, boundingBoxItems]);

    const offsetRatio = useMemo(() => getImageOffsetRatio(imageWidth, imageHeight, outputWidth, outputHeight), [
        imageWidth,
        imageHeight,
        outputWidth,
        outputHeight
    ]);

    return (
        <BoundingBoxesContainer
            style={{
                left: offsetRatio.left,
                top: offsetRatio.top,
                transform: `scale(${offsetRatio.ratio})`,
                WebkitTransformOrigin: 'top left'
            }}
            className={className}
            width={imageWidth}
            height={imageHeight}
            ref={canvasRef}
        />
    );
};

export default BoundingBoxes;
