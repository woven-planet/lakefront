import 'jest-canvas-mock';
import { CANVAS_DEFAULTS, graphContext } from './utils/graphTestUtils.util';
import { JSONBuilderUtil } from './utils/JSONBuilder.util';
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

            const { drawn, graph, groups } = graphContext(json);

            const center = CANVAS_DEFAULTS.width / 4;

            const x1 = getX(
                groups,
                1,
                50,
                CANVAS_DEFAULTS.width,
                0,
                -1,
                0,
                graph,
                drawn,
                3,
                [],
                {}
            );

            const x2 = getX(
                groups,
                2,
                50,
                CANVAS_DEFAULTS.width,
                0,
                -1,
                1,
                graph,
                drawn,
                3,
                [],
                {}
            );

            const x3 = getX(
                groups,
                3,
                50,
                CANVAS_DEFAULTS.width,
                0,
                -1,
                2,
                graph,
                drawn,
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
