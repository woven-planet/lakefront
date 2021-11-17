import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers)

global.ResizeObserver = class ResizeObserver {
    observe() {
        return null;
    }
    disconnect() { }
};
