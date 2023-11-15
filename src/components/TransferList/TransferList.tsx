import { FC, useState } from 'react';
import CheckboxGroupComponent from '../CheckboxGroup/CheckboxGroup';
import {
    ButtonColumnContainer,
    CheckBoxContainer,
    GridContainer,
    PanelContainer,
    StyledButton,
    StyledH4
} from './transferListStyles';

interface ListItem {
    label: string;
    description: string;
    value: string;
}

const JOB_TYPES_1: ListItem[] = [
    // { label: 'Finished', value: 'finished' },
    // { label: 'Cancelled', value: 'canceled' },
    // { label: 'Failed', value: 'failed' },
    // { label: 'Running', value: 'running' },
    {
        label: 'oad-guardian-virtual',
        description: 'virtual (generated) Guardian Dual Cockpit',
        value: 'oad-guardian-virtual virtual (generated) Guardian Dual Cockpit'
    },
    {
        label: 'oad-ollr',
        description: 'virtual (generated) p4a',
        value: 'oad-ollr virtual (generated) p4a'
    }
];

const JOB_TYPES_2: ListItem[] = [{ label: 'Pending', description: 'pending', value: 'enqueued' }];

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
        const itemsToMove = sourceList.filter((item) => selected.has(item.value));
        const updatedSourceList = sourceList.filter((item) => !selected.has(item.value));
        targetList.push(...itemsToMove);
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

    const handleAllRight = () => {
        setListTwoOptions(listOneOptions.concat(listTwoOptions));
        setListOneOptions([]);
        setListOneValue(new Set<string>());
    };

    const handleAllLeft = () => {
        setListOneOptions(listTwoOptions.concat(listOneOptions));
        setListTwoOptions([]);
        setListTwoValue(new Set<string>());
    };

    return (
        <GridContainer>
            <PanelContainer>
                <StyledH4>Title Column One</StyledH4>
                <CheckBoxContainer>
                    <CheckboxGroupComponent
                        options={listOneOptions}
                        name={'listOne'}
                        selected={listOneValue}
                        onHandleChange={handleListOneClick}
                        handleUpdateList={handleMoveLeftToRight}
                    />
                </CheckBoxContainer>
            </PanelContainer>
            <ButtonColumnContainer>
                <StyledButton color="secondary" disabled={listOneOptions.length === 0} onClick={handleAllRight}>
                    ≫
                </StyledButton>
                <StyledButton color="secondary" disabled={listOneValue.size === 0} onClick={handleMoveLeftToRight}>
                    &gt;
                </StyledButton>
                <StyledButton color="secondary" disabled={listTwoValue.size === 0} onClick={handleMoveRightToLeft}>
                    &lt;
                </StyledButton>
                <StyledButton color="secondary" disabled={listTwoOptions.length === 0} onClick={handleAllLeft}>
                    ≪
                </StyledButton>
            </ButtonColumnContainer>
            <PanelContainer>
                <StyledH4>Title Column Two</StyledH4>
                <CheckBoxContainer>
                    <CheckboxGroupComponent
                        options={listTwoOptions}
                        name={'listTwo'}
                        selected={listTwoValue}
                        onHandleChange={handleListTwoClick}
                        handleUpdateList={handleMoveRightToLeft}
                    />
                </CheckBoxContainer>
            </PanelContainer>
        </GridContainer>
    );
};

export default TransferList;
