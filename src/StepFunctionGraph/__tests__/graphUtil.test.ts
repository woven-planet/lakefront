import 'jest-canvas-mock';
import { graphContext } from './utils/graphTestUtils.util';
import { JSONBuilderUtil } from './utils/JSONBuilder.util';
import {
    adjustDepthMatrix,
    getDrawnRange,
    getGroupIndex,
    getGroupsAtDepth,
    getNearestDrawn,
    getNextVertex,
    getRange,
    isInParallel,
    isSameLevelType,
    NodeDimensions,
    redrawNode
} from '../GraphUtil';
import * as CanvasUtilModule from '../canvasUtil';
import { WorkFlowType } from '../StepFunctionUtil';
import { getNodeDimensions } from '../canvasUtil';
import { X_OFFSET } from '../GraphRenderer';

describe('graphUtil', () => {
    let ctx: CanvasRenderingContext2D | null;

    beforeEach(() => {
        ctx = document.createElement('canvas').getContext('2d');
    });

    describe('adjustDepthMatrix', () => {
        it('should shift a Parallel node up one depth level', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'ParallelNode')
                .addParallel('ParallelNode', [
                    new JSONBuilderUtil().addTask('P1').getJson(),
                    new JSONBuilderUtil().addTask('P2').getJson()
                ], 'EndNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const { graph, verticesAtDepth } = graphContext(json);
            const adjusted = adjustDepthMatrix(verticesAtDepth, graph);
            const expected: number[][] = [
                [0], // Start
                [1], // StartNode
                [3, 4, 2], // P1, P2, ParallelNode
                [5], // EndNode
                [6] // End
            ];

            expect(adjusted).toStrictEqual(expected);
        });

        it('should shift a Map node up one depth level', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'MapNode')
                .addMap('MapNode', new JSONBuilderUtil().addTask('M1').getJson(), 'EndNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const { graph, verticesAtDepth } = graphContext(json);
            const adjusted = adjustDepthMatrix(verticesAtDepth, graph);
            const expected: number[][] = [
                [0], // Start
                [1], // StartNode
                [3, 2], // M1, MapNode
                [4], // EndNode
                [5] // End
            ];

            expect(adjusted).toStrictEqual(expected);
        });
    });

    describe('getDrawnRange', () => {
        const json = new JSONBuilderUtil()
            .addTask('StartNode', 'ParallelNode')
            .addParallel('ParallelNode', [
                new JSONBuilderUtil().addTask('P1').getJson(),
                new JSONBuilderUtil().addTask('P2').getJson(),
                new JSONBuilderUtil().addTask('P3').getJson()
            ], 'EndNode')
            .addTask('EndNode', undefined, true)
            .getJson();

        it('should return 0 with a range of one node', () => {
            const { drawn, graph } = graphContext(json);

            expect(getDrawnRange([1], graph, drawn)).toBe(0);
        });

        it('should calculate using the leftMostX when a first is not drawn', () => {
            const { drawn, graph } = graphContext(json);
            const nodeDimensions = { mountingPoints: { right: { x: 0 }}} as NodeDimensions;
            drawn.set(1, nodeDimensions);

            expect(getDrawnRange([0, 1], graph, drawn, -100)).toBe(100);
        });

        it('should return the drawn range between two nodes', () => {
            const { drawn, graph } = graphContext(json);
            const nodeDimensionsLeft = { mountingPoints: { left: { x: 100 }}} as NodeDimensions;
            const nodeDimensionsRight = { mountingPoints: { right: { x: 250 }}} as NodeDimensions;

            drawn.set(3, nodeDimensionsLeft);
            drawn.set(4, nodeDimensionsRight);

            expect(getDrawnRange([3, 4], graph, drawn)).toBe(150);
        });

        it('should return the drawn range between leftMostX and another node even when the first node is drawn', () => {
            const { drawn, graph } = graphContext(json);
            const nodeDimensionsLeft = { mountingPoints: { left: { x: -100 }}} as NodeDimensions;
            const nodeDimensionsMiddle = { mountingPoints: { left: { x: 125 }, right: { x: 175 }}} as NodeDimensions;
            const nodeDimensionsRight = { mountingPoints: { right: { x: 250 }}} as NodeDimensions;

            drawn.set(3, nodeDimensionsLeft);
            drawn.set(4, nodeDimensionsMiddle);
            drawn.set(5, nodeDimensionsRight);

            expect(getDrawnRange([3, 4, 5], graph, drawn)).toBe(350);
        });

        it('should return the drawn range between three nodes', () => {
            const { drawn, graph } = graphContext(json);
            const nodeDimensionsLeft = { mountingPoints: { left: { x: 100 }}} as NodeDimensions;
            const nodeDimensionsRight = { mountingPoints: { right: { x: 250 }}} as NodeDimensions;

            drawn.set(3, nodeDimensionsLeft);
            drawn.set(4, nodeDimensionsRight);

            expect(getDrawnRange([3, 4], graph, drawn, 0)).toBe(250);
        });
    });

    describe('getNextVertex', () => {
       it('should return the next vertex by Next field given a valid vertex', () => {
           const json = new JSONBuilderUtil()
               .addTask('StartNode', 'EndNode')
               .addTask('EndNode', undefined, true)
               .getJson();

           const { graph } = graphContext(json);

           expect(getNextVertex(1, graph)).toBe(2);
       });

        it('should return -1 for the start, end, and a non-existent vertex', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'EndNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const { graph } = graphContext(json);

            expect(getNextVertex(0, graph)).toBe(-1);
            expect(getNextVertex(2, graph)).toBe(-1);
            expect(getNextVertex(10, graph)).toBe(-1);
        });
    });

    describe('getNearestDrawn', () => {
        it('should return the next node when evaluating two tasks with both drawn', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'EndNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const { drawn, graph } = graphContext(json);

            drawn.set(2, {} as NodeDimensions);

            const nearestDrawn = getNearestDrawn(1, graph, drawn);

            expect(nearestDrawn).toBe(2);
        });

        it('should return the vertex it was called with if it has been drawn', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'EndNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const { drawn, graph } = graphContext(json);

            drawn.set(1, {} as NodeDimensions);

            const nearestDrawn = getNearestDrawn(1, graph, drawn);

            expect(nearestDrawn).toBe(1);
        });

        it('should return -1 when a drawn node cannot be found', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'EndNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const { drawn, graph } = graphContext(json);
            const nearestDrawn = getNearestDrawn(1, graph, drawn);

            // drawn is empty
            expect(nearestDrawn).toBe(-1);
        });
    });

    describe('getGroupIndex', () => {
        it('should return the index from the groups matrix when a vertex is present', () => {
            const groups = [[1], [2, 3]];

            expect(getGroupIndex(groups, 1)).toBe(0);
            expect(getGroupIndex(groups, 2)).toBe(1);
        });

        it('should return -1 when a vertex is not present', () => {
            const groups = [[1], [2, 3]];

            expect(getGroupIndex(groups, 5)).toBe(-1);
        });
    });

    describe('getGroupsAtDepth', () => {
        it('should return a matrix with a single group when given no Parallel nodes', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'ParallelNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const { graph, verticesAtDepth } = graphContext(json);
            // verticesAtDepth[0] contains the start node, not StartNode
            const groupsAtDepth = getGroupsAtDepth(verticesAtDepth[1], graph);
            const expected = [[1]];

            expect(groupsAtDepth).toStrictEqual(expected);
        });

        it('should return a matrix with a two groups when given a Parallel node and a task', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'ParallelNode')
                .addParallel('ParallelNode', [
                    new JSONBuilderUtil().addTask('P1').getJson()
                ], 'EndNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const { graph, verticesAtDepth } = graphContext(json);
            const groupsAtDepth = getGroupsAtDepth(verticesAtDepth[2], graph);
            const expected = [[3], [2]];

            expect(groupsAtDepth).toStrictEqual(expected);
        });
    });

    describe('getRange', () => {
        const json = new JSONBuilderUtil()
            .addTask('StartNode', 'ChoiceNode')
            .addChoice('ChoiceNode', [
                JSONBuilderUtil.getChoiceForAdd('ParallelNode')
            ])
            .addParallel('ParallelNode', [
                new JSONBuilderUtil()
                    .addTask('P1')
                    .addTask('P2')
                    .getJson()
            ], 'MapNode')
            .addMap('MapNode', new JSONBuilderUtil().addTask('M1').getJson(), 'EndNode')
            .addSuccess('EndNode', undefined, true)
            .getJson();

        const { graph } = graphContext(json);

        it('should return the node width when only one node is in a row', () => {
            const expected = getNodeDimensions('StartNode').width;

            expect(getRange([1], 0, graph)).toBe(expected);
        });

        it('should add two nodes that are next to each other with two X_OFFSETs', () => {
            const expected = getNodeDimensions('P1').width +
                getNodeDimensions('P2').width +
                X_OFFSET +
                X_OFFSET;
            expect(getRange([4, 5], X_OFFSET, graph)).toBe(expected);
        });

        it('should return 0 if no vertices are in the array', () => {
            expect(getRange([], 0, graph)).toBe(0);
        });

        it('should not add a Parallel node in the range calculation', () => {
            expect(getRange([3], 0, graph)).toBe(0);
        });
    });

    describe('isSameLevelType', () => {
       it('should return true if the workflow is a PARALLEL or MAP', () => {
           expect(isSameLevelType(WorkFlowType.PARALLEL)).toBe(true);
           expect(isSameLevelType(WorkFlowType.MAP)).toBe(true);
       });

       it('should return false if the workflow is not a PARALLEL or MAP', () => {
           expect(isSameLevelType(WorkFlowType.START)).toBe(false);
           expect(isSameLevelType(WorkFlowType.CHOICE)).toBe(false);
           expect(isSameLevelType(WorkFlowType.SUCCEED)).toBe(false);
           expect(isSameLevelType(WorkFlowType.TASK)).toBe(false);
           expect(isSameLevelType(WorkFlowType.END)).toBe(false);
       });
    });

    describe('redrawNode', () => {
        it('should draw a choice, task, or succeed (default case) node', () => {
            const drawStepNodeSpy = spyOn(CanvasUtilModule, 'drawStepNode');
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'Choice')
                .addChoice('ChoiceNode', [
                    JSONBuilderUtil.getChoiceForAdd('EndNode')
                ])
                .addSuccess('EndNode', undefined, true)
                .getJson();

            const { drawn, graph } = graphContext(json);

            // StartNode (Task)
            redrawNode(1, ctx as CanvasRenderingContext2D, drawn, graph, []);
            expect(drawStepNodeSpy).toHaveBeenCalledTimes(1);

            // ChoiceNode (Choice)
            redrawNode(2, ctx as CanvasRenderingContext2D, drawn, graph, []);
            expect(drawStepNodeSpy).toHaveBeenCalledTimes(2);

            //EndNode (Success)
            redrawNode(3, ctx as CanvasRenderingContext2D, drawn, graph, []);
            expect(drawStepNodeSpy).toHaveBeenCalledTimes(3);
        });

        it('should not draw a Parallel, Map, Start, or End node', () => {
            const drawStepNodeSpy = spyOn(CanvasUtilModule, 'drawStepNode');
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'ParallelNode')
                .addParallel('ParallelNode', [
                    new JSONBuilderUtil().addTask('P1').getJson(),
                    new JSONBuilderUtil().addTask('P2').getJson()
                ], 'MapNode')
                .addMap('MapNode', new JSONBuilderUtil().addTask('M1').getJson(), 'EndNode')
                .addSuccess('EndNode', undefined, true)
                .getJson();

            const { drawn, graph } = graphContext(json);

            // Start
            redrawNode(0, ctx as CanvasRenderingContext2D, drawn, graph, []);
            expect(drawStepNodeSpy).not.toHaveBeenCalled();

            // ParallelNode (Parallel)
            redrawNode(2, ctx as CanvasRenderingContext2D, drawn, graph, []);
            expect(drawStepNodeSpy).not.toHaveBeenCalled();

            // MapNode (Map)
            redrawNode(5, ctx as CanvasRenderingContext2D, drawn, graph, []);
            expect(drawStepNodeSpy).not.toHaveBeenCalled();

            // End
            redrawNode(8, ctx as CanvasRenderingContext2D, drawn, graph, []);
            expect(drawStepNodeSpy).not.toHaveBeenCalled();
        });
    });

    describe('isInParallel', () => {
        it('should return true if a vertex is inside a Parallel node (direct parent)', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'ParallelNode')
                .addParallel('ParallelNode', [
                    new JSONBuilderUtil()
                        .addTask('P1')
                        .addTask('P2')
                        .getJson()
                ], 'MapNode')
                .getJson();

            const { graph } = graphContext(json);

            // P1
            expect(isInParallel(3, graph)).toBe(true);
            // P2
            expect(isInParallel(4, graph)).toBe(true);
        });

        it('should return false if a vertex is not inside a Parallel node (direct parent)', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'ChoiceNode')
                .addChoice('ChoiceNode', [
                    JSONBuilderUtil.getChoiceForAdd('ParallelNode')
                ])
                .addParallel('ParallelNode', [
                    new JSONBuilderUtil()
                        .addTask('P1')
                        .addTask('P2')
                        .getJson()
                ], 'MapNode')
                .addMap('MapNode', new JSONBuilderUtil().addTask('M1').getJson(), 'EndNode')
                .addSuccess('EndNode', undefined, true)
                .getJson();

            const { graph } = graphContext(json);

            // Start
            expect(isInParallel(0, graph)).toBe(false);
            // StartNode
            expect(isInParallel(1, graph)).toBe(false);
            // ChoiceNode
            expect(isInParallel(2, graph)).toBe(false);
            // ParallelNode
            expect(isInParallel(3, graph)).toBe(false);
            // MapNode
            expect(isInParallel(6, graph)).toBe(false);
            // EndNode
            expect(isInParallel(7, graph)).toBe(false);
            // End
            expect(isInParallel(8, graph)).toBe(false);
        });
    });
});
