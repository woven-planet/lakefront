import 'jest-canvas-mock';
import { CANVAS_DEFAULTS, graphContext } from './utils/graphTestUtils.util';
import { JSONBuilderUtil } from './utils/JSONBuilder.util';
import { getX, X_OFFSET } from '../GraphRenderer';
import { WorkFlowType } from '../StepFunctionUtil';
import { NodeDimensions } from '../GraphUtil';

describe('graphRenderer', () => {
    const CENTER = CANVAS_DEFAULTS.width / 4;
    const NODE_WIDTH = 50;

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

            expect(x1).toBe(CENTER);
            expect(x2).toBe(CENTER);
            expect(x3).toBe(CENTER);
        });

        it('should position a single Parallel in the center', () => {
            const json = new JSONBuilderUtil()
                .addParallel('ParallelNode', [
                    new JSONBuilderUtil().addTask('P1').getJson()
                ], undefined, true)
                .getJson();

            const { drawn, graph, groups } = graphContext(json);

            drawn.set(1, { nodeType: WorkFlowType.PARALLEL } as NodeDimensions);

            const x = getX(
                groups,
                2,
                50,
                CANVAS_DEFAULTS.width,
                0,
                -1,
                2,
                graph,
                drawn,
                4,
                [],
                {}
            );

            expect(x).toBe(CENTER);
        });

        it('should position two choice nodes correctly', () => {
            const json = new JSONBuilderUtil()
                .addChoice('ChoiceNode', [
                    JSONBuilderUtil.getChoiceForAdd('Choice1'),
                    JSONBuilderUtil.getChoiceForAdd('Choice2')
                ])
                .addTask('Choice1', 'EndNode')
                .addTask('Choice2', 'EndNode')
                .addSuccess('EndNode', undefined, true)
                .getJson();

            const { drawn, graph, groups } = graphContext(json);

            drawn.set(1, { nodeType: WorkFlowType.CHOICE, x: CENTER } as NodeDimensions);

            const x1 = getX(
                groups,
                2,
                50,
                CANVAS_DEFAULTS.width,
                0,
                -1,
                2,
                graph,
                drawn,
                4,
                [],
                {}
            );

            drawn.set(2, { nodeType: WorkFlowType.TASK, x: x1 } as NodeDimensions);

            const previousEnd = x1 as number + 50;

            const x2 = getX(
                groups,
                3,
                50,
                CANVAS_DEFAULTS.width,
                0,
                previousEnd,
                2,
                graph,
                drawn,
                4,
                [],
                {}
            );

            const expectedX2 = previousEnd + (NODE_WIDTH / 2) + X_OFFSET;

            expect(x1).toBe(CENTER);
            expect(x2).toBe(expectedX2);
        });
    });
});
