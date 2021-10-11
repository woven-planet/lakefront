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
    const BASE_TASK_TYPES = {
        TASK: {
            Type: 'Task'
        },
        SUCCESS: {
            Type: 'Success'
        },
        CHOICE: {
            Type: 'Choice'
        }
    }

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
        const newTask = 'NewTask';
        
        it('Adds state at provided key of type "Task"', () => {
            jsonBuild.addTask(newTask);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.TASK
            });
        });

        it('Adds provided next to added task', () => {
            const next = 'Next';
            jsonBuild.addTask(newTask, next);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.TASK,
                Next: next
            });
        });

        it('Sets end to true when provided truthy end value on added task', () => {
            const truthyEndTask = 'TruthyEndTask';
            jsonBuild.addTask(newTask, undefined, false);
            jsonBuild.addTask(truthyEndTask, undefined, true);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.TASK
            });
            expect(jsonBuild.json.States[truthyEndTask]).toMatchObject({
                ...BASE_TASK_TYPES.TASK,
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
                ...BASE_TASK_TYPES.TASK
            });
        });

        it('Adds state at provided nested string path of type "Task"', () => {
            const nestedStringPath = 'Nested.String.Path';
            jsonBuild.addTaskAtPath(nestedStringPath);

            expect(RPath(convertToArrayPath(nestedStringPath), jsonBuild.json.States)).toMatchObject({
                ...BASE_TASK_TYPES.TASK
            });
        });

        it('Adds state at provided nested array path of type "Task"', () => { 
            jsonBuild.addTaskAtPath(nestedArrayPath);

            expect(RPath(nestedArrayPath, jsonBuild.json.States)).toMatchObject({
                ...BASE_TASK_TYPES.TASK
            });
        });

        it('Adds provided next to added task', () => {
            const next = 'Next';
            jsonBuild.addTaskAtPath(nestedArrayPath, next);

            expect(RPath(nestedArrayPath, jsonBuild.json.States)).toMatchObject({
                ...BASE_TASK_TYPES.TASK,
                Next: next
            });
        });

        it('Sets end to true when provided truthy end value on added task', () => {
            const truthyNestedArrayPath = [...nestedArrayPath];
            jsonBuild.addTaskAtPath(nestedArrayPath, undefined, false);
            jsonBuild.addTaskAtPath(truthyNestedArrayPath, undefined, true);

            expect(RPath(nestedArrayPath, jsonBuild.json.States)).toMatchObject({
                ...BASE_TASK_TYPES.TASK
            });
            expect(RPath(truthyNestedArrayPath, jsonBuild.json.States)).toMatchObject({
                ...BASE_TASK_TYPES.TASK,
                End: true
            });
        });
    });

    describe('addSuccess', () => {
        const jsonBuild = new JSONBuilderUtil();
        const newTask = 'NewTask';
        
        it('Adds state at provided key of type "Success"', () => {
            jsonBuild.addSuccess(newTask);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.SUCCESS
            });
        });

        it('Adds provided next to added task', () => {
            const next = 'Next';
            jsonBuild.addSuccess(newTask, next);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.SUCCESS,
                Next: next
            });
        });

        it('Sets end to true when provided truthy end value on added task', () => {
            const truthyEndTask = 'TruthyEndTask';
            jsonBuild.addSuccess(newTask, undefined, false);
            jsonBuild.addSuccess(truthyEndTask, undefined, true);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.SUCCESS
            });
            expect(jsonBuild.json.States[truthyEndTask]).toMatchObject({
                ...BASE_TASK_TYPES.SUCCESS,
                End: true
            });
        });
    });

    describe('addChoice', () => {
        const jsonBuild = new JSONBuilderUtil();
        const newTask = 'NewTask';
        const choices = [{ Next: 'One'}, { Next: 'Two'}, { Next: 'Three'}]
        
        it('Adds state at provided key of type "Choice"', () => {
            jsonBuild.addChoice(newTask, choices);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.CHOICE
            });
        });

        it('Adds provided next to added task', () => {
            const next = 'Next';
            jsonBuild.addChoice(newTask, choices, next);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.CHOICE,
                Next: next
            });
        });

        it('Sets end to true when provided truthy end value on added task', () => {
            const truthyEndTask = 'TruthyEndTask';
            jsonBuild.addChoice(newTask, choices, undefined, false);
            jsonBuild.addChoice(truthyEndTask, choices, undefined, true);

            expect(jsonBuild.json.States[newTask]).toMatchObject({
                ...BASE_TASK_TYPES.CHOICE
            });
            expect(jsonBuild.json.States[truthyEndTask]).toMatchObject({
                ...BASE_TASK_TYPES.CHOICE,
                End: true
            });
        });
    });
});
