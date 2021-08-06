import 'jest-canvas-mock';
import { CANVAS_DEFAULTS, generateGraph } from './utils/graphTestUtils.util';
import { JSONBuilderUtil } from './utils/JSONBuilder.util';
import { NodeDimensions } from '../GraphUtil';
import { getX } from '../GraphRenderer';

describe('graphRenderer', () => {
    let ctx;

    beforeEach(() => {
        ctx = document.createElement('canvas').getContext('2d');
    });

    describe('getX', () => {
        it('gives correct X for a single column of tasks', () => {
            const json = new JSONBuilderUtil()
                .addTask('StartNode', 'NodeTwo')
                .addTask('NodeTwo', 'EndNode')
                .addTask('EndNode', undefined, true)
                .getJson();

            const graph = generateGraph(json);
            const map = new Map<number, NodeDimensions>();
            const center = CANVAS_DEFAULTS.width / 4;

            const x1 = getX(
                [],
                [1],
                1,
                50,
                CANVAS_DEFAULTS.width,
                50,
                -1,
                0,
                graph,
                map,
                3,
                [],
                {}
            );

            const x2 = getX(
                [],
                [2],
                2,
                50,
                CANVAS_DEFAULTS.width,
                50,
                -1,
                1,
                graph,
                map,
                3,
                [],
                {}
            );

            const x3 = getX(
                [],
                [3],
                1,
                50,
                CANVAS_DEFAULTS.width,
                50,
                -1,
                2,
                graph,
                map,
                3,
                [],
                {}
            );

            expect(x1).toBe(center);
            expect(x2).toBe(center);
            expect(x3).toBe(center);
        });
    });
});
