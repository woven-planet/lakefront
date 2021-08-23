import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import AnchorCopyComponent, { AnchorCopyProps } from 'src/AnchorCopy';
import Input from 'src/Input/Input';
import DocBlock from '.storybook/DocBlock';
import { green } from 'src/styles/lakefrontColors';

export default {
    title: 'Lakefront/AnchorCopy',
    component: AnchorCopyComponent,
    argTypes: {
        // TODO
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<AnchorCopyProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const [title, setTitle] = useState(`anchor-copy`);
    const [copied, setCopied] = useState('');

    const handleChange = ({ target: { value } }) => {
        setCopied('');
        setTitle(value);
    };

    const handleCopy = (copiedHash: string) => {
        setCopied(`Copied ${copiedHash}`);
    };

    return (
        <div>
            <AnchorCopyComponent {...args} title="Modify text below. Click the link icon to copy it." hashId={title} onCopy={handleCopy} />
            <Input
                value={title}
                onChange={handleChange}
                style={{ marginTop: 8 }}
            />
            <div style={{ color: green, minHeight: 25 }}>{copied}</div>
        </div>
    );
};

export const AnchorCopy = Template.bind({});
AnchorCopy.args = {};
