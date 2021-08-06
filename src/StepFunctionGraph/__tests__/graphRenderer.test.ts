import 'jest-canvas-mock';
import { setupGraph } from './utils/graphTestUtils.util';

describe('graphRenderer', () => {
    let ctx;

    beforeEach(() => {
        ctx = document.createElement('canvas').getContext('2d');
    });

    describe('getX', () => {
        it('gives correct X for a node', () => {
            setupGraph();
        });
    });
});
