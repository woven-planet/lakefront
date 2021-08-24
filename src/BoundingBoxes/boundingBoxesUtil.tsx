export interface BoundingBoxItemProp {
    name: string;
    items: {
        confidence: number;
        bbox: number[][];
    }[];
    color: string;
}

interface OffsetRatio {
    left: number;
    top: number;
    ratio: number;
}

const BORDER_WIDTH = 3;

/**
 * Draws a single bounding box given a 2D canvas rendering context and the bounding box item.
 */
export const drawSingleBox = (ctx: CanvasRenderingContext2D, bboxItem: BoundingBoxItemProp) => {
    const { color, items, name } = bboxItem;

    ctx.strokeStyle = color;
    ctx.lineWidth = BORDER_WIDTH;

    items.forEach((item) => {
        const bbox = item.bbox;

        const leftX = bbox[0][0];
        const topY = bbox[0][1];
        const width = bbox[1][0] - bbox[0][0];
        const height = bbox[1][1] - bbox[0][1];
        ctx.strokeRect(leftX, topY, width, height);

        ctx.font = 'bold 36px sans-serif';
        ctx.fillStyle = color;
        ctx.fillText(name, leftX, topY - 10);
    });
};

/**
 * Get ratio and image offset for scaling the image in a container.
 */
export const getImageOffsetRatio = (
    imageWidth: number,
    imageHeight: number,
    outputWidth: number,
    outputHeight: number
): OffsetRatio => {
    if (imageWidth !== 0 && outputWidth !== 0) {
        const imageRatio = imageWidth / imageHeight;
        const outputRatio = outputWidth / outputHeight;

        // the output image has less width, introducing side bars
        if (imageRatio < outputRatio) {
            const desiredWidth = imageRatio * outputHeight;

            return {
                // output the left offset by dividing into 2 the diff between the desired and output width
                left: Math.abs(outputWidth - desiredWidth) / 2,
                top: 0,
                // compute ratio by dividing the heights
                ratio: 1 / (imageHeight / outputHeight)
            };
        } else if (imageRatio > outputRatio) {
            // the output image has less height, introducing top and bottom bars
            const desiredHeight = outputWidth / imageRatio;

            return {
                left: 0,
                // output the top offset by dividing into 2 the diff between the desired and output height
                top: Math.abs(outputHeight - desiredHeight) / 2,
                // compute ratio by dividing the widths
                ratio: 1 / (imageWidth / outputWidth)
            };
        }
    }

    return { left: 0, top: 0, ratio: 1 };
};
