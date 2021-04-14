// This is done in JavaScript since it's still missing from TypeScript.
// There's an issue to track its progress here: https://github.com/microsoft/TypeScript/issues/37861
const resizeObserver = (callback) => {
    return new ResizeObserver(callback);
};

export default resizeObserver;
