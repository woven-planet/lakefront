import { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CardComponent, { CardProps } from 'src/Card/Card';
import Snackbar from 'src/Snackbar';
import { MESSAGE_TYPES } from 'src/Snackbar/Snackbar.util';

export default {
    title: 'Lakefront/Card',
    component: CardComponent
} as Meta;

const Template: Story<CardProps> = () => {
    const [showMsg, setShowMsg] = useState<boolean>(false);

    const showMessage = (_value: boolean) => {
        setShowMsg(value => !value);
    };

    const handleClose = () => {
        showMessage(false);
    };

    return (
        <div>
            <Snackbar message='Clicked' open={showMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose} type={MESSAGE_TYPES.SUCCESS} />
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

const MultiTemplateCard: Story<CardProps> = () => {
    const [showMsg, setShowMsg] = useState<boolean>(false);

    const showMessage = (_value: boolean) => {
        setShowMsg(value => !value);
    };

    const handleClose = () => {
        showMessage(false);
    };

    return (
        <div>
            <Snackbar message='Clicked' open={showMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose} type={MESSAGE_TYPES.SUCCESS} />
            <CardComponent
                title='Card 1'
                description='A description of the card being used.'
                content={<span>Card content</span>}
                disabled={false}
                onClick={() => showMessage(true)}
            />
            <CardComponent
                title='Card 2'
                description='A description of the card being used.'
                content={<span>Card content</span>}
                disabled={false}
                onClick={() => showMessage(true)}
            />
            <CardComponent
                title='Card 3'
                description='A description of the card being used.'
                content={<span>Card content</span>}
                disabled={false}
                onClick={() => showMessage(true)}
            />
            <CardComponent
                title='Card 4'
                description='A description of the card being used.'
                content={<span>Card content</span>}
                disabled={false}
                onClick={() => showMessage(true)}
            />
            <CardComponent
                title='Card 5'
                description='A description of the card being used.'
                content={<span>Card content</span>}
                disabled={false}
                onClick={() => showMessage(true)}
            />
            <CardComponent
                title='Card 6'
                description='A description of the card being used.'
                content={<span style={{ height: 250, width: 500 }}>Card content</span>}
                disabled={false}
                onClick={() => showMessage(true)}
            />
        </div>
    );
};

export const Card = Template.bind({});

export const MultiCard = MultiTemplateCard.bind({});
