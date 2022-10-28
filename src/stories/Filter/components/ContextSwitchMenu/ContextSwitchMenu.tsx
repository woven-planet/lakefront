import { FC, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import SelectPopover, { SelectPopoverOption } from 'src/components/SelectPopover/SelectPopover';
import { ContextSwitchMenuProps } from 'src/components/Filter/types';
import { ButtonLabel, ContextSwitchContainer, DropdownButton } from './contextSwitchMenuStyles';
import { ReactComponent as DownArrow } from '../assets/downArrow.svg';

const ContextSwitchMenu: FC<ContextSwitchMenuProps> = ({ options, value, onChange }) => {
    const [actionsVisible, setActionsVisible] = useState<boolean>(false);

    const handleDropdown = () => {
        setActionsVisible((prevState) => !prevState);
    };

    const handleClick = (value: any) => {
        onChange(value);
        setActionsVisible(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <ContextSwitchContainer>
                <SelectPopover
                    handleClick={handleClick}
                    visible={actionsVisible}
                    options={Array.from(options.entries()).map(
                        ([key, value]): SelectPopoverOption => ({
                            name: value,
                            value: key,
                            key
                        })
                    )}
                >
                    <DropdownButton alternate onClick={handleDropdown}>
                        <ButtonLabel>
                            {options.get(value)}
                            <DownArrow />
                        </ButtonLabel>
                    </DropdownButton>
                </SelectPopover>
            </ContextSwitchContainer>
        </ThemeProvider>
    );
};

export default ContextSwitchMenu;
