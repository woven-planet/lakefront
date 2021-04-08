// Main draw function for the graph
import Digraph from './Digraph';
import DigraphDFS from './DigraphDFS';
import { drawArrow, drawMap, drawParallel, drawStepNode, drawTerminalNode, getNodeDimensions } from './canvasUtil';
import { WorkFlowType } from './StepFunctionUtil';
import {
    adjustDepthMatrix,
    findNearestArrowNode,
    generateMountingPoints,
    getDrawnRange,
    getDrawnRangeMiddleX,
    getGroupIndex,
    getGroupsAtDepth,
    getNearestDrawn,
    getNextVertex,
    getRange,
    isInParallel,
    isSameLevelType,
    NodeDimensions,
    redrawNode
} from './GraphUtil';

const X_OFFSET = 30;
export const Y_OFFSET = 75;
const TERMINAL_ARROW_OFFSET = 12;
const STEP_ARROW_OFFSET = -5;

const handleMap = (
    ctx: CanvasRenderingContext2D,
    vertex: number,
    endVertex: number,
    graph: Digraph,
    drawn: Map<number, NodeDimensions>,
    highlight: boolean,
    highlighted: number[]
) => {
    const MAP_PADDING = 20;
    const MAP_TOP_OFFSET = 17;
    const COLLISION_TOP_OFFSET = 26;
    const COLLISION_LEFT_OFFSET = 12;
    const MAP_HEIGHT_OFFSET = 5;
    const mapNode = graph.getDataByVertex(vertex);
    const [key] = Object.keys(mapNode);
    const { Iterator, End } = mapNode[key];
    const { States } = Iterator;
    const nodes = Object.values(States) || [];

    // Map types can have a Next within outdegree nodes and be an End at the same time
    // so we need to find the nearest Next so we can terminate the DFS paths before exiting the Map
    const nestedNext = nodes.reduce((next: number, current: any) => {
        const { Next } = current;
        const nextVertexFindFn = (datum: any) => {
            const [dataKey] = Object.keys(datum);
            return dataKey === Next;
        };
        let nextNode = graph.getVertexByData(nextVertexFindFn);
        if (nextNode) {
            nextNode = getNearestDrawn(nextNode, graph, drawn);
        }

        return nextNode || next;
    }, -1);

    const nextVertex = getNextVertex(vertex, graph);
    const endPathVertex: number = ~nextVertex ? nextVertex : (nestedNext as number);
    const paths = DigraphDFS.getAllDfsPaths(graph.getAdjacencyMatrix(), [vertex], undefined, endPathVertex);

    const exclusionArray: number[] = [vertex, endVertex];
    if (nextVertex !== -1) {
        exclusionArray.push(nextVertex);
    }
    const mapNodeMatrix = DigraphDFS.getVerticesAtDepthFromPaths(paths, exclusionArray);
    const baselineNode = drawn.get(mapNodeMatrix[0][0]);
    const baselineWidth = baselineNode ? baselineNode.width : 0;
    const widestNode = mapNodeMatrix.reduce((accum, current) => {
        const widestX = current.reduce((accum, currentDepthVertex) => {
            const drawnVertex = drawn.get(currentDepthVertex) || { width: 0 };
            const [indegree] = graph.getIndegree(currentDepthVertex);
            const indegreeNode = graph.getDataByVertex(indegree) || {};
            const [key] = indegreeNode ? Object.keys(indegreeNode) : [''];
            const { Type: indegreeType } = indegreeNode[key];
            let width = drawnVertex ? drawnVertex.width : 0;

            // Map nodes with special nodes inside need to account for the extra width
            if (indegree !== vertex &&
                (indegreeType === WorkFlowType.MAP || indegreeType === WorkFlowType.PARALLEL)
            ) {
                width += MAP_PADDING * 2;
            }
            return width > accum ? width : accum;
        }, baselineWidth);

        return widestX > accum ? widestX : accum;
    }, baselineWidth);

    // Calculate the lower bounds of the Parallel content
    const lastDepth = mapNodeMatrix[mapNodeMatrix.length - 1];
    const topLeftNode = mapNodeMatrix[0][0];
    const bottomRightNode = lastDepth[lastDepth.length - 1];

    const topLeft = drawn.get(topLeftNode);
    const bottomRight = drawn.get(bottomRightNode);

    const topLeftPos = {
        x: topLeft ? topLeft.x : 0,
        y: topLeft ? topLeft.y : 0,
        width: topLeft ? topLeft.width : 0
    };

    const bottomRightPos = {
        x: bottomRight ? bottomRight.x : 0,
        y: bottomRight ? bottomRight.y : 0,
        height: bottomRight ? bottomRight.height : 0,
        width: bottomRight ? bottomRight.width : 0
    };

    const mapArgs = {
        ctx,
        x: topLeftPos.x,
        y: (topLeftPos.y - bottomRightPos.height),
        width: widestNode + (MAP_PADDING * 2),
        height: -(topLeftPos.y - bottomRightPos.y) + bottomRightPos.height + (MAP_PADDING * 1.5),
        highlight
    };

    drawMap(mapArgs);

    // Redraw nodes inside a Map since they get covered up by the Map's fill
    const flattenedMatrix = ([] as number[]).concat(...mapNodeMatrix);
    flattenedMatrix.forEach((vertex) => {
        redrawNode(vertex, ctx, drawn, graph, highlighted);
    });

    const nodeData = {
        x: mapArgs.x,
        y: mapArgs.y + (mapArgs.height / 2) + MAP_HEIGHT_OFFSET,
        width: mapArgs.width,
        height: mapArgs.height,
        nodeType: WorkFlowType.MAP,
        vertex,
        end: !!End
    } as NodeDimensions;

    const drawnData = {
        ...nodeData,
        ...{ mountingPoints: generateMountingPoints(nodeData, MAP_TOP_OFFSET, STEP_ARROW_OFFSET) },
        ...{ collisionBox: generateMountingPoints(nodeData, COLLISION_TOP_OFFSET, 0, COLLISION_LEFT_OFFSET) }
    };

    drawn.set(
        vertex,
        drawnData
    );
};

// Draws Parallel nodes specially, drawing the box around the nodes a Parallel vertex points to
const handleParallel = (
    ctx: CanvasRenderingContext2D,
    graph: Digraph,
    vertex: number,
    endVertex: number,
    drawn: Map<number, NodeDimensions>,
    highlight: boolean
) => {
    const PARALLEL_PADDING = 20;
    const parallelNode = graph.getDataByVertex(vertex);
    const [key] = Object.keys(parallelNode);
    const { End } = parallelNode[key];
    const nextVertex = getNextVertex(vertex, graph);
    const exclusionArray: number[] = [vertex, endVertex];

    if (nextVertex !== -1) {
        exclusionArray.push(nextVertex);
    }

    const paths = DigraphDFS.getAllDfsPaths(graph.getAdjacencyMatrix(), [vertex]);
    const parallelNodeMatrix = DigraphDFS.getVerticesAtDepthFromPaths(paths, exclusionArray);

    const baselineNode = drawn.get(parallelNodeMatrix[0][0]);
    const baselineX = baselineNode ? baselineNode.x : 0;

    // Calculate the start of the Parallel box's contents so we can position it
    // in conjunction with the range of the nodes
    const leftMostX = parallelNodeMatrix.reduce((accum, current) => {
        const smallestX = current.reduce((accum, currentDepthVertex) => {
            const drawnVertex = drawn.get(currentDepthVertex);
            const x = drawnVertex ? drawnVertex.mountingPoints.left.x : accum;
            return x < accum ? x : accum;
        }, baselineX);

        return smallestX < accum ? smallestX : accum;
    }, baselineX) - PARALLEL_PADDING;

    const range: number = parallelNodeMatrix.reduce((accum, current) => {
        const currentRange = getDrawnRange(current, graph, drawn, leftMostX);

        return currentRange > accum ? currentRange : accum;
    }, 0);

    // Calculate the lower bounds of the Parallel content
    const lastDepth = parallelNodeMatrix[parallelNodeMatrix.length - 1];
    const topLeftNode = parallelNodeMatrix[0][0];
    const bottomRightNode = lastDepth[lastDepth.length - 1];

    const topLeft = drawn.get(topLeftNode);
    const bottomRight = drawn.get(bottomRightNode);

    const topLeftPos = {
        x: topLeft ? topLeft.x : 0,
        y: topLeft ? topLeft.y : 0,
        width: topLeft ? topLeft.width : 0
    };

    const bottomRightPos = {
        x: bottomRight ? bottomRight.collisionBox.right.x : 0,
        y: bottomRight ? bottomRight.y : 0,
        height: bottomRight ? bottomRight.height : 0,
        width: bottomRight ? bottomRight.width : 0
    };

    const parallelArgs = {
        ctx,
        x: topLeft ? topLeft.mountingPoints.left.x - (PARALLEL_PADDING / 2) : leftMostX,
        y: (topLeftPos.y - bottomRightPos.height - PARALLEL_PADDING) - 1,
        width: range + PARALLEL_PADDING,
        height: -(topLeftPos.y - bottomRightPos.y) + bottomRightPos.height + (PARALLEL_PADDING * 3),
        highlight
    };

    drawParallel(parallelArgs);

    const nodeData = {
        x: parallelArgs.x,
        y: parallelArgs.y,
        width: parallelArgs.width,
        height: parallelArgs.height,
        nodeType: WorkFlowType.PARALLEL,
        vertex,
        end: !!End
    } as NodeDimensions;

    const drawnData = {
        ...nodeData,
        ...{ mountingPoints: generateMountingPoints(nodeData, STEP_ARROW_OFFSET, 0) },
        ...{ collisionBox: generateMountingPoints(nodeData, STEP_ARROW_OFFSET, 0) }
    };

    drawn.set(
        vertex,
        drawnData
    );
};

// Returns the furthest left range if no preceding node is drawn, otherwise it draws under the Parent node
// by using the node's indegree and looking it up in the Map
const getX = (
    groups: number[][],
    drawableVertices: number[],
    vertex: number,
    nodeWidth: number,
    canvasWidth: number,
    range: number,
    previousEnd: number,
    previousVertex: number,
    graph: Digraph,
    drawn: Map<number, NodeDimensions>,
    endVertex: number
): number => {
    const isEnd = vertex === endVertex;

    // There is only one parent node for any node except the end node
    const indegrees = graph.getIndegree(vertex);
    const previousIndegrees = graph.getIndegree(previousVertex);

    // For nodes that don't have a position, we'll need to look up higher in the chain to get a position
    const grandparentIndegrees = indegrees ? graph.getIndegree(indegrees[indegrees.length - 1]) : [];

    // We'll need to know if the previously drawn node shares the same parent to determine how we position
    // relative to the parent
    const indegreeOverlap = (previousIndegrees && indegrees) ?
        indegrees.some(v => previousIndegrees.includes(v)) :
        false;

    // Helpful to know if we're in a group so we can try to determine if we're positioning by previous
    const isInPreviousGroup = getGroupIndex(groups, vertex) === getGroupIndex(groups, previousVertex);
    const parentNode = indegrees[indegrees.length - 1];
    const flattened = ([] as number[]).concat(...groups);

    // The center for the canvas is generally the width divided by 4, since each node is drawn offset by half its width
    const centerDivision = 4;

    const drawnParent = graph.getDataByVertex(parentNode) || {};
    const [key] = Object.keys(drawnParent);
    const { Type: parentType = '' } = key ? drawnParent[key] : {};
    const mapParentPosition = parentType === WorkFlowType.MAP && grandparentIndegrees.length > 0 ?
        drawn.get(grandparentIndegrees[grandparentIndegrees.length - 1]) :
        null;
    const parentPosition = drawn.get(parentNode) || mapParentPosition;
    const nextVertex = getNextVertex(parentNode, graph);
    const parentOutdegree = parentNode ? graph.getOutdegree(parentNode).outVertices : [];
    const isParallelNext = nextVertex === vertex && parentType === WorkFlowType.PARALLEL;
    const parallelRange = getDrawnRangeMiddleX(parentOutdegree, graph, drawn);
    const newPositionByPrevious = previousEnd + (nodeWidth / 2) + X_OFFSET;

    // Base this X value on where the parent is, or the center of the canvas if there is no parent (the start node)
    const parentX = parentPosition ? parentPosition.x : (canvasWidth / centerDivision);
    const positionByPrevious = (~previousEnd && isSameLevelType(parentType)) ||
        (~previousEnd && !isInPreviousGroup) ||
        parentType === WorkFlowType.CHOICE;
    let positionByParent = parentType !== WorkFlowType.CHOICE &&
        (
            (!~previousEnd && !isSameLevelType(parentType)) ||
            (!indegreeOverlap && (parentType !== WorkFlowType.PARALLEL)) ||
            isParallelNext
        );

    if (positionByPrevious && positionByParent && parentX < newPositionByPrevious) {
        positionByParent = false;
    }

    // The rangePosition tells us where we need to draw in a range when positioning by previous
    // eslint-disable-next-line no-nested-ternary
    let rangePosition = ~previousEnd ?
        previousEnd + (nodeWidth / 2) + X_OFFSET :
        (flattened.length > 1) ?
            parentX - (range / 2) - (X_OFFSET * (drawableVertices.length - 1)) :
            (nodeWidth / 4);

    if (parentType === WorkFlowType.CHOICE && !~previousEnd && flattened.length > 1) {
        //rangePosition = parentX - (range / centerDivision) - (X_OFFSET * (drawableVertices.length - 1));
    }

    if (parentType === WorkFlowType.CHOICE && !isInPreviousGroup) {
        rangePosition += X_OFFSET * 2;
    }

    let calculatedX;

    if (isEnd) {
        calculatedX = canvasWidth / centerDivision;
    } else if (positionByPrevious && !positionByParent) {
        const [previousIndegreeVertex] = previousIndegrees;
        const graphPreviousIndegree = graph.getDataByVertex(previousIndegreeVertex) || {};
        const [key] = Object.keys(graphPreviousIndegree);
        const { Type: previousIndegreeType = '' } = key ? graphPreviousIndegree[key] : {};
        const drawnPreviousIndegree = drawn.get(previousIndegreeVertex);
        calculatedX = previousIndegreeType === WorkFlowType.PARALLEL && parentType !== WorkFlowType.PARALLEL && drawnPreviousIndegree ?
            drawnPreviousIndegree.mountingPoints.right.x :
            rangePosition;
    } else if (positionByParent) {
        calculatedX = isParallelNext ? parallelRange : parentX;
    } else {
        calculatedX = rangePosition;
    }

    return calculatedX;
};

// Calculates the Y for each node based on depth in the depth matrix
const getY = (depth: number, nodeHeight: number): number => {
    return (depth * (nodeHeight + Y_OFFSET)) + Y_OFFSET;
};

// Main draw function for the Step Function Graph
export const drawGraph = (
    canvasRef: HTMLCanvasElement,
    drawn: Map<number, NodeDimensions>,
    traversals: number[][],
    graph: Digraph,
    ctx: CanvasRenderingContext2D,
    pan: any,
    scale: number,
    height: number,
    width: number,
    highlighted: number[] = []
) => {
    // The transform values help place the center of the canvas with scaling in mind
    const xTransform = -(scale - 1) * width / 2;
    const yTransform = -(scale - 1) * height / 2;
    const scaledWidth = Math.abs(pan.offset.x) / scale;
    const scaledHeight = Math.abs(pan.offset.y) / scale;

    // Get all vertices at each depth from the possible paths so we can draw the graph more easily
    let verticesAtDepth: number[][] = DigraphDFS.getVerticesAtDepthFromPaths(traversals, [], true);

    // We need to adjust the matrix such that all Parallel node descendants are pulled up a level
    verticesAtDepth = adjustDepthMatrix(verticesAtDepth, graph);

    const allVertices: number[] = ([] as number[]).concat(...verticesAtDepth);

    const endVertex = graph.getVerticesCount() - 1;

    // This is what zooms the graph as well as sets the initial scale
    ctx.setTransform(scale, 0, 0, scale, xTransform, yTransform);

    // We clear the whole graph each draw, redraw it after panning. The scaled value math is for
    // expanding the canvas as it is zoomed in and out so we don't get fractals of drawn graphs.
    // This doesn't work at extreme scaling, so something isn't perfect here, but in conjunction with
    // the zoom limiting it seems stable.
    ctx.clearRect(0 - scaledWidth, 0 - scaledHeight, width + scaledWidth, height + scaledHeight);

    // Panning is handled by translating offsets
    ctx.translate(pan.offset.x, pan.offset.y);

    // Main loop for drawing most nodes, outer loop iterating over each depth in the graph matrix
    verticesAtDepth.forEach((depth: number[], depthIndex: number) => {
        const groups: number[][] = getGroupsAtDepth(depth, graph);
        const depthWithoutParallel = depth.filter(vertex => {
            const node = graph.getDataByVertex(vertex);
            const [key] = Object.keys(node);
            const { Type } = node[key];
            return Type !== WorkFlowType.PARALLEL && Type !== WorkFlowType.MAP;
        });

        // Inner loop iterating over each vertex at a depth
        depthWithoutParallel.forEach((vertex: number, index: number) => {
            const previousVertex = depthWithoutParallel[index - 1];
            const previous = drawn.get(previousVertex);

            // Calculates the end of the previously drawn node so we can place the current node laterally
            let previousEnd = previous ? previous.collisionBox.right.x : -1;
            const node = graph.getDataByVertex(vertex);
            const [key] = Object.keys(node);
            const { Type, End } = node[key];

            const { height: nodeHeight, width: nodeWidth } = getNodeDimensions(key);

            // if (
            //     (~previousEnd && !isInParallel(vertex, graph)) ||
            //     (~previousEnd && isInParallel(vertex, graph) && !isInParallel(previousVertex, graph))
            // ) {
            //     previousEnd += nodeWidth;
            // } else if (~previousEnd) {
            //     previousEnd += nodeWidth / 4;
            // }

            // Flattening the groups array since we sometimes need to work with the whole data set
            const flattened = ([] as number[]).concat(...groups);

            // We don't need to offset a lone node at any given depth
            const xOffset = flattened.length > 1 ? X_OFFSET : 0;
            const range = getRange(flattened, xOffset, graph);

            const x = getX(
                groups,
                depthWithoutParallel,
                vertex,
                nodeWidth,
                width,
                range,
                previousEnd,
                previousVertex,
                graph,
                drawn,
                endVertex
            );
            const y = getY(depthIndex, nodeHeight);
            const highlight = highlighted.includes(vertex);

            switch (Type) {
                case WorkFlowType.START:
                    drawTerminalNode({ ctx, x, y, text: key });
                    break;
                case WorkFlowType.END:
                    drawTerminalNode({ ctx, x, y, text: key });
                    break;
                case WorkFlowType.TASK:
                    drawStepNode({ ctx, x, y, text: key, highlight });
                    break;
                case WorkFlowType.CHOICE:
                    drawStepNode({ ctx, x, y, text: key, highlight });
                    break;
                case WorkFlowType.MAP:
                    break;
                case WorkFlowType.PARALLEL:
                    break;
                default:
                    drawStepNode({ ctx, x, y, text: key, highlight });
                    break;
            }

            const nodeData = {
                x,
                y,
                width: nodeWidth,
                height: nodeHeight,
                nodeType: Type,
                vertex,
                end: !!End
            } as NodeDimensions;

            const CIRCLE_TOP_OFFSET = 5;
            const topOffset = Type === WorkFlowType.START || Type === WorkFlowType.END ?
                TERMINAL_ARROW_OFFSET + CIRCLE_TOP_OFFSET :
                -STEP_ARROW_OFFSET * 2;

            const CIRCLE_BOTTOM_OFFSET = 10;
            const bottomOffset = Type === WorkFlowType.START || Type === WorkFlowType.END ?
                TERMINAL_ARROW_OFFSET + CIRCLE_BOTTOM_OFFSET :
                STEP_ARROW_OFFSET;

            const drawnData = {
                ...nodeData,
                ...{ mountingPoints: generateMountingPoints(nodeData, topOffset, bottomOffset) },
                ...{ collisionBox: generateMountingPoints(nodeData, topOffset, bottomOffset) }
            };

            // Store node data after drawing
            drawn.set(
                vertex,
                drawnData
            );
        });
    });

    // Go back and draw all the Parallel and Map boxes we skipped earlier now that we can determine the height and width
    allVertices.forEach((vertex) => {
        // At this point, any un-drawn vertices should be Parallel and Map type nodes
        const node = graph.getDataByVertex(vertex);
        const [key] = Object.keys(node);
        const { Type } = node[key];
        const highlight = highlighted.includes(vertex);

        // Just double-check that it's a Parallel type before drawing it
        if (Type === WorkFlowType.PARALLEL) {
            handleParallel(ctx, graph, vertex, endVertex, drawn, highlight);
        } else if (Type === WorkFlowType.MAP) {
            handleMap(ctx, vertex, endVertex, graph, drawn, highlight, highlighted);
        }
    });

    // Draw arrows
    const allPaths = DigraphDFS.getAllDfsPaths(graph.getAdjacencyMatrix(), [0], undefined);
    const drawnArrowPairs: [number, number][] = [];

    allPaths.forEach((path: number[]) => {
        path.forEach((vertex, index) => {
            const node = findNearestArrowNode(path, vertex, index, drawn, true);
            const nextNode = findNearestArrowNode(path, vertex, index, drawn, false);
            const alreadyDrawn = ~drawnArrowPairs.findIndex((tuple) => {
                const [n1, n2] = tuple;
                return n1 === node?.vertex && n2 === nextNode?.vertex;
            });

            if (node && nextNode && node.vertex !== nextNode.vertex && nextNode.nodeType && !alreadyDrawn) {
                const { mountingPoints: mount0 } = node;
                const { mountingPoints: mount1 } = nextNode;

                const nextEnd = nextNode.nodeType === WorkFlowType.END;

                if (mount0 &&
                    mount1 &&
                    mount0.bottom.y < mount1.top.y &&
                    node.nodeType !== WorkFlowType.PARALLEL) {
                    drawArrow(
                        ctx,
                        drawn,
                        mount0.bottom,
                        mount1.top,
                        5,
                        false,
                        false,
                        nextEnd
                    );

                    drawnArrowPairs.push([node.vertex, nextNode.vertex]);
                } else if (nextNode.nodeType === WorkFlowType.END) {
                    drawArrow(
                        ctx,
                        drawn,
                        mount0.bottom,
                        mount1.top,
                        5,
                        false,
                        false,
                        true
                    );
                    drawnArrowPairs.push([node.vertex, nextNode.vertex]);
                } else {
                    // The else block handles MAP and PARALLEL nodes
                    const offsetArrowStart = node.nodeType === WorkFlowType.PARALLEL;
                    const hideArrow = node.nodeType === WorkFlowType.MAP;
                    const endOffset = hideArrow ? 5 : 0;
                    const parallelNode = graph.getDataByVertex(vertex);
                    const [parallelNodeKey] = Object.keys(parallelNode);
                    const { End, Next } = parallelNode[parallelNodeKey];
                    const nextVertexFindFn = (datum: any) => {
                        const [dataKey] = Object.keys(datum);
                        return dataKey === Next;
                    };
                    const connectingNode = graph.getVertexByData(nextVertexFindFn);
                    const bottomArrow = End || nextNode.vertex !== connectingNode ? mount0.top : mount0.bottom;

                    drawArrow(
                        ctx,
                        drawn,
                        bottomArrow,
                        mount1.top,
                        5,
                        hideArrow,
                        offsetArrowStart,
                        nextEnd,
                        endOffset
                    );
                    drawnArrowPairs.push([node.vertex, nextNode.vertex]);
                }
            }
        });
    });
};
