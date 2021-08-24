import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import AnchorCopyComponent, { AnchorCopyProps } from 'src/AnchorCopy';
import Input from 'src/Input/Input';
import DocBlock from '.storybook/DocBlock';
import { green, saturatedRed } from 'src/styles/lakefrontColors';

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
            <AnchorCopyComponent
                {...args}
                disabled={args.disabled || !title}
                title={args.title || 'Modify text below and click the link icon to copy it.'}
                hashId={args.hashId || title}
                onCopy={handleCopy}
            />
            <Input value={args.title || title} onChange={handleChange} style={{ marginTop: 8 }} />
            <div style={{ color: green, minHeight: 24 }}>
                {copied}
                <span style={{ color: saturatedRed, minHeight: 24 }}>
                    {!title && 'Copying is disabled due to empty input.'}
                </span>
            </div>
        </div>
    );
};

export const AnchorCopy = Template.bind({});
AnchorCopy.args = {
    disabled: false
};
