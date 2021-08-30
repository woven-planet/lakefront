import { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import CopyButtonComponent, { CopyButtonProps } from 'src/CopyButton';
import { ButtonComponentProps } from 'src/Button/buttonUtil';
import Input from 'src/Input/Input';
import DocBlock from '.storybook/DocBlock';
import { green, saturatedRed } from 'src/styles/lakefrontColors';

export default {
    title: 'Lakefront/CopyButton',
    component: CopyButtonComponent,
    argTypes: {
        onCopy: {
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

const Template: Story<CopyButtonProps & Omit<ButtonComponentProps, 'onCopy'>> = (args) => {
    const [copyText, setCopyText] = useState('text');
    const [copied, setCopied] = useState('');

    const handleChange = ({ target: { value } }) => {
        setCopied('');
        setCopyText(value);
    };

    const handleCopy = (copiedHash: string) => {
        setCopied(`Copied "${copiedHash}"`);
    };

    return (
        <div>
            <CopyButtonComponent
                {...args}
                valueToCopy={args.valueToCopy || copyText}
                disabled={args.disabled || !copyText}
                onCopy={handleCopy}
            />
            <Input value={args.valueToCopy || copyText} onChange={handleChange} style={{ marginTop: 8 }} />
            <div style={{ color: green, minHeight: 24 }}>
                {copied}
                <span style={{ color: saturatedRed, minHeight: 24 }}>
                    {!copyText && 'Copying is disabled due to empty input.'}
                </span>
            </div>
        </div>
    );
};

export const CopyButton = Template.bind({});
