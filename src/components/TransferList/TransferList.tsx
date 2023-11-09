import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { blue, white } from 'src/styles/lakefrontColors';
import CheckboxGroupComponent from '../CheckboxGroup/CheckboxGroup';
import Button from '../Button/Button';

// Define your Emotion styled components
const Panel = styled.div({
    width: '20%',
    padding: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    borderBottom: '1px solid #222222',
    boxShadow: '2px 0 10px -5px rgba(0, 0, 0, 0.5), -2px 0 10px -5px rgba(0, 0, 0, 0.5)',
    overflowY: 'auto',
    height: 350
});

const GridContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-evenly'
});

const PanelContainer = styled(Panel)({
    backgroundColor: white
});

const ButtonColumnContainer = styled.div({
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center'
});

const StyledButton = styled(Button)({
   marginBottom: 5
});

interface ListItem {
    label: string;
    value: string;
}

const JOB_TYPES_1: ListItem[] = [
    { label: 'Finished', value: 'finished' },
    { label: 'Cancelled', value: 'canceled' },
    { label: 'Failed', value: 'failed' },
    { label: 'Running', value: 'running' }
];

const JOB_TYPES_2: ListItem[] = [
    { label: 'Pending', value: 'enqueued' }
];

const TransferList: FC = () => {
    const [listOneValue, setListOneValue] = useState(new Set<string>());
    const [listTwoValue, setListTwoValue] = useState(new Set<string>());
    const [listOneOptions, setListOneOptions] = useState(JOB_TYPES_1);
    const [listTwoOptions, setListTwoOptions] = useState(JOB_TYPES_2);

    const handleListOneClick = (option: any) => {
        setListOneValue(option);
    };

    const handleListTwoClick = (option: any) => {
        setListTwoValue(option);
    };

    const moveItems = (sourceList: ListItem[], targetList: ListItem[], selected: Set<string>) => {
        const itemsToMove = sourceList.filter(item => selected.has(item.value));
        console.log('Items To Move', itemsToMove);

        const updatedSourceList = sourceList.filter(item => !selected.has(item.value));
        console.log('Update Source List', updatedSourceList);

        targetList.push(...itemsToMove);
        console.log('Target List', targetList);

        return [updatedSourceList, [...targetList]];
    };

    const handleMoveLeftToRight = () => {
        const [updatedListOne, updatedListTwo] = moveItems(listOneOptions, listTwoOptions, listOneValue);
        setListOneOptions(updatedListOne);
        setListTwoOptions(updatedListTwo);
        setListOneValue(new Set<string>());
    };

    const handleMoveRightToLeft = () => {
        const [updatedListTwo, updatedListOne] = moveItems(listTwoOptions, listOneOptions, listTwoValue);
        setListTwoOptions(updatedListTwo);
        setListOneOptions(updatedListOne);
        setListTwoValue(new Set<string>());
    };

    return (
        <GridContainer>
            <PanelContainer>
                <CheckboxGroupComponent
                    options={listOneOptions}
                    allLabel={'All'}
                    name={'listOne'}
                    selected={listOneValue}
                    onHandleChange={handleListOneClick}
                />
            </PanelContainer>
            <ButtonColumnContainer>
                <StyledButton color='secondary' disabled={listOneValue.size === 0} onClick={handleMoveLeftToRight}>Shift Right</StyledButton>
                <StyledButton color='secondary' disabled={listTwoValue.size === 0} onClick={handleMoveRightToLeft}>Shift Left</StyledButton>
            </ButtonColumnContainer>
            <PanelContainer>
                <CheckboxGroupComponent
                    options={listTwoOptions}
                    allLabel={'All'}
                    name={'listTwo'}
                    selected={listTwoValue}
                    onHandleChange={handleListTwoClick}
                />
            </PanelContainer>
        </GridContainer>
    );
};

export default TransferList;
