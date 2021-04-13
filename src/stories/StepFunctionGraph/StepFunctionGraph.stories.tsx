import { Meta, Story } from '@storybook/react/types-6-0';

import DocBlock from '.storybook/DocBlock';
import StepFunctionGraph, { GraphProps } from '../../StepFunctionGraph/Graph';
import { choiceJson, mapInMap, longJson, simpleJson, complexJson } from "./stepFunctionGraphData";

export default {
    title: 'Lakefront/StepFunctionGraph',
    component: StepFunctionGraph,
    argTypes: {
        handleClick: {
            action: 'clicked'
        },
        children: {
            table: {
                disable: true
            }
        }
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<GraphProps> = (args) => (
    <div style={{ height: 500, width: '100%' }}>
        <StepFunctionGraph {...args} />
    </div>
);

export const SimpleGraph = Template.bind({});

SimpleGraph.args = {
    json: simpleJson,
    handleSelectedNode: () => {},
    highlightedKey: null
};

export const ComplexGraph = Template.bind({});

ComplexGraph.args = {
    json: complexJson,
    handleSelectedNode: () => {},
    highlightedKey: null
};

export const ChoiceGraph = Template.bind({});

ChoiceGraph.args = {
    json: choiceJson,
    handleSelectedNode: () => {},
    highlightedKey: null
};

export const LongGraph = Template.bind({});

LongGraph.args = {
    json: longJson,
    handleSelectedNode: () => {},
    highlightedKey: null
};

export const MapGraph = Template.bind({});

MapGraph.args = {
    json: mapInMap,
    handleSelectedNode: () => {},
    highlightedKey: null
};
