import { convertToArrayPath, numberOrIdentity, JSONBuilderUtil } from '../JSONBuilder.util';
import { cleanup } from '@testing-library/react';
import * as R from 'ramda';

const { path: RPath } = R;

afterAll(cleanup);

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
    beforeEach(cleanup);
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

    describe('getChoiceForAdd', () => {
        it('returns a base step function "Choice" object', () => {
            expect(JSONBuilderUtil.getChoiceForAdd('next')).toMatchObject({
                Next: 'next'
            })
        });
    });

    describe('addTask', () => {
        const jsonBuild = new JSONBuilderUtil();
        const firstTask = 'FirstTask';
        
        it('Adds state at provided key of type "Task"', () => {
            jsonBuild.addTask(firstTask);

            expect(jsonBuild.json.States[firstTask]).toMatchObject({
                Type: 'Task'
            });
        });

        it('Adds provided next to added task', () => {
            const next = 'Next';
            jsonBuild.addTask(firstTask, next);

            expect(jsonBuild.json.States[firstTask]).toMatchObject({
                Type: 'Task',
                Next: next
            });
        });

        it('Sets end to true when provided truthy end value on added task', () => {
            const truthyEndTask = 'TruthyEndTask';
            jsonBuild.addTask(firstTask, undefined, false);
            jsonBuild.addTask(truthyEndTask, undefined, true);

            expect(jsonBuild.json.States[firstTask]).toMatchObject({
                Type: 'Task'
            });
            expect(jsonBuild.json.States[truthyEndTask]).toMatchObject({
                Type: 'Task',
                End: true
            });
        });
    });

    describe('addTaskAtPath', () => {
        const jsonBuild = new JSONBuilderUtil();
        const nestedArrayPath = ['Nested' , 'String', 'Path'];

        it('Adds state at provided rootPath of type "Task"', () => {
            const rootPath = 'RootPath';
            jsonBuild.addTaskAtPath(rootPath);

            expect(jsonBuild.json.States[rootPath]).toMatchObject({
                Type: 'Task'
            });
        });

        it('Adds state at provided nested string path of type "Task"', () => {
            const nestedStringPath = 'Nested.String.Path';
            jsonBuild.addTaskAtPath(nestedStringPath);

            expect(RPath(convertToArrayPath(nestedStringPath), jsonBuild.json.States)).toMatchObject({
                Type: 'Task'
            });
        });

        it('Adds state at provided nested array path of type "Task"', () => { 
            jsonBuild.addTaskAtPath(nestedArrayPath);

            expect(RPath(nestedArrayPath, jsonBuild.json.States)).toMatchObject({
                Type: 'Task'
            });
        });

        it('Adds provided next to added task', () => {
            const next = 'Next';
            jsonBuild.addTaskAtPath(nestedArrayPath, next);

            expect(RPath(nestedArrayPath, jsonBuild.json.States)).toMatchObject({
                Type: 'Task',
                Next: next
            });
        });

        it('Sets end to true when provided truthy end value on added task', () => {
            const truthyNestedArrayPath = [...nestedArrayPath];
            jsonBuild.addTaskAtPath(nestedArrayPath, undefined, false);
            jsonBuild.addTaskAtPath(truthyNestedArrayPath, undefined, true);

            expect(RPath(nestedArrayPath, jsonBuild.json.States)).toMatchObject({
                Type: 'Task'
            });
            expect(RPath(truthyNestedArrayPath, jsonBuild.json.States)).toMatchObject({
                Type: 'Task',
                End: true
            });
        });
    });
});
