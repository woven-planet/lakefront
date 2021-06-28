import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import SelectPopover, { SelectPopoverOption } from 'src/SelectPopover/SelectPopover';
import Button from 'src/Button/Button';
import { ContextSwitchMenuProps } from 'src/Filter/types';
import { ReactComponent as DownArrow } from './assets/downArrow.svg';

const ContextSwitchContainer = styled.div({
    alignSelf: 'center'
});

const DropdownButton = styled(Button)(({ theme }) => ({
    width: 180,
    height: 36,
    paddingLeft: 13,
    padding: 0,
    border: `0px solid white`,
    fontWeight: 400,
    justifyContent: 'space-between',
    ':hover': {
        backgroundColor: theme.colors.white
    },
    ':after': {
        transition: 'transform 0s, opacity 0s'
    }
}));

const ButtonLabel = styled.div({
    fontFamily: "'Source Sans Pro', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    borderBottom: 0,
    padding: 0
});

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
