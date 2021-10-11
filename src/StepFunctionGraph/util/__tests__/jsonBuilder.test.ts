import { convertToArrayPath, numberOrIdentity, JSONBuilderUtil } from '../JSONBuilder.util';

describe('convertToArrayPath', () => {
    const PATH = ['a', 'b', 'c'];

    it('returns empty array if path is empty string', () => {
        expect(convertToArrayPath('')).toMatchObject([]);
    });

    it('returns the provided array if path is an array', () => {
        expect(convertToArrayPath(PATH)).toBe(PATH);
    });

    it('splits the provided path using "." as the seperator', () => {
        expect(convertToArrayPath('a.b.c')).toMatchObject(PATH);
    });
});

describe('numberOrIdentity', () => {
    it('converts argument to a number if possible.', () => {
        expect(numberOrIdentity(1)).toBe(1);
        expect(numberOrIdentity('1')).toBe(1);
        expect(numberOrIdentity(0)).toBe(0);
        expect(numberOrIdentity('0')).toBe(0);
        expect(numberOrIdentity(null)).toBe(0);
        expect(numberOrIdentity(false)).toBe(0);
        expect(numberOrIdentity([-1])).toBe(-1);
    });

    it('returns provided argument if number conversion is not possible', () => {
        expect(numberOrIdentity(undefined)).toBeUndefined();

        const obj = { a: 1 };
        expect(numberOrIdentity(obj)).toBe(obj);

        const arr = [1, 2];
        expect(numberOrIdentity(arr)).toBe(arr);
    });
});

describe('JSONBuilderUtil', () => {
    const INITIAL_JSON = { StartAt: '', States: {} };

    it('sets initial json to proper StepFunction object when no json provided to constructor', () => {
        const jsonBuild = new JSONBuilderUtil();
        expect(jsonBuild.json).toMatchObject(INITIAL_JSON);
    });

    it('sets json to JSON provided to constructor', () => {
        const stepFunctionJSON = { StartAt: 'Start', States: { Start: {} }};
        const jsonBuild = new JSONBuilderUtil(stepFunctionJSON);
        expect(jsonBuild.json).toBe(stepFunctionJSON);
    });
});
