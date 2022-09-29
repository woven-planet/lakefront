import { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CardComponent, { CardProps } from 'src/Card/Card';
import Snackbar from 'src/Snackbar';
import { MESSAGE_TYPES } from 'src/Snackbar/Snackbar.util';
import { StyledSnackbarContent } from 'src/Snackbar/snackbarStyles';
import SnackbarContent from 'src/Snackbar/SnackbarContent';

export default {
    title: 'Lakefront/Card',
    component: CardComponent,
    argTypes: {}
} as Meta;

const Template: Story<CardProps> = () => {
    const [showMsg, setShowMsg] = useState<boolean>(false);

    const showMessage = (value: boolean) => {
        setShowMsg(value);
    };


    const handleOnClick = () => {
        showMessage(false);
    };

    return (
        <div>
            <Snackbar message='"More Details" successfully clicked.' action={() => handleOnClick} type={MESSAGE_TYPES.SUCCESS} />
            <CardComponent
                title='Card Title'
                description='A description of the card being used.'
                content={<span>Card content</span>}
                disabled={false}
                onClick={() => showMessage(true)}
            />
        </div>
    );
};

export const Card = Template.bind({});
