import { Operator, State, StepFunction } from '../types';

export function stringifyChoiceOperator(operator: Operator) {
    const isLeaf = (operator: Operator) => Boolean(operator.Variable);

    const stringifyLeaf = (operator: Operator) => {
        const { Variable, ...rest } = operator;
        const conditionName = Object.keys(rest)[0] as keyof Omit<Operator, 'Variable'>;
        const conditionValue = rest[conditionName];
        return `(${stringifyVariable(operator.Variable || '')} ${stringifyOperatorName(conditionName)} ${conditionValue})`;
    };

    const traverse = (operator: Operator): string => {
        if (isLeaf(operator)) {
            return stringifyLeaf(operator);
        } else {
            const { Next, ...rest } = operator;
            const operatorName = Object.keys(rest)[0] as keyof Omit<Operator, 'Next'>;

            if (Array.isArray(rest[operatorName])) {
                const childOperators = rest[operatorName] as Operator[];
                return `(${childOperators.map(traverse).join(` ${operatorName} `)})`;
            } else {
                const childOperator = rest[operatorName] as Operator;
                return `(${operatorName} (${traverse(childOperator)}))`;
            }
        }
    };

    const stringifyVariable = (variable: string) => variable.slice(2);

    const stringifyOperatorName = (operatorName: string) => {
        switch (true) {
            case /.*GreaterThanEquals$/.test(operatorName):
                return '>=';
            case /.*LessThanEquals$/.test(operatorName):
                return '<=';
            case /.*GreaterThan$/.test(operatorName):
                return '>';
            case /.*LessThan$/.test(operatorName):
                return '<';
            case /.*Equals$/.test(operatorName):
                return '=';
            default:
                return operatorName;
        }
    };

    try {
        return traverse(operator);
    } catch (error) {
        return '';
    }
}

export function getStates(stepFunction: StepFunction): Record<string, State> {
    const states: any = {};
    traverseStepFunction(stepFunction, (stateName: string, state: State) => {
        states[stateName] = oneLevelDeepClone(state, true);
    });
    return states;
}

const DIRECTIONAL_DATA_KEYS = ['Branches', 'Choices', 'Iterator', 'Metadata'];

const isDirectionalData = (key: string) => DIRECTIONAL_DATA_KEYS.includes(key);

function oneLevelDeepClone(object: any, includeAdditionalData = false) {
    return Object.keys(object).reduce<Record<string, State>>((acc, key) => {
        // Current key is not a directional data key
        // and value at key is an object or array, don't clone it.
        if ((Array.isArray(object[key]) || typeof object[key] === 'object') && !isDirectionalData(key)) {
            return acc;
        }

        // Current key is directional data key, but includeAdditionalData is false, don't clone it.
        if (!includeAdditionalData && isDirectionalData(key)) {
            return acc;
        }

        // Current key is directional data key and includeAdditionalData is true, clone it.
        if (isDirectionalData(key)) {
            acc[key] = object[key];
            return acc;
        }

        // Current value is not an object or array, shorten if needed and clone it.
        const shortenedValue = `${object[key]}`.length > 25 ? `${object[key]}`.slice(0, 25) + '...' : object[key];

        acc[key] = shortenedValue;
        return acc;
    }, {});
}

function traverseStepFunction(stepFunction: StepFunction, callback: (stateName: string, step: State) => void) {
    Object.keys(stepFunction.States).forEach((stateName) => {
        const state = stepFunction.States[stateName];

        callback(stateName, state);

        switch (state.Type) {
            case 'Parallel': {
                state.Branches.forEach((branch) => {
                    traverseStepFunction(branch, callback);
                });
                break;
            }
            case 'Map': {
                traverseStepFunction(state.Iterator, callback);
                break;
            }
        }
    });
}
