import ContextMenu, { ContextMenuProps, MenuItem } from 'src/components/ContextMenu/ContextMenu';
import DocBlock from '.storybook/DocBlock';
import { Meta, StoryFn } from '@storybook/react-webpack5';

export default {
    title: 'Lakefront/ContextMenu',
    component: ContextMenu,
    argTypes: {
        children: {
            control: false,
            table: { disable: true },
        },
        menuItems: {
            control: 'object',
        }
    },
    parameters: {
        docs: {
            page: DocBlock,
            source: {
                transform: (source: string) => {
                    return source
                        .replace(/function noRefCheck\(\)\s\{\}/g, '() => {}')
                        .replace(/\n/g, '')
                        .replace(/[ ]{2,}/g, ' ');
                }
            }
        }
    }
} as Meta;

const EditIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const CopyIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const DeleteIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;

const MENU_ITEMS: MenuItem[] = [
    { label: 'Edit', onClick: () => alert('Edit clicked'), icon: <EditIcon /> },
    { label: 'Copy', onClick: () => alert('Copy clicked'), icon: <CopyIcon /> },
    { isSeparator: true },
    { label: 'Paste', onClick: () => alert('Paste clicked'), disabled: true },
    { isSeparator: true },
    { label: 'Delete', onClick: () => alert('Delete clicked'), icon: <DeleteIcon /> },
];

const Template: StoryFn<ContextMenuProps> = (args) => {
    return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <p>Right-click on the area below to trigger the context menu.</p>
                <ContextMenu {...args}>
                    <div
                        style={{
                            width: '10%',
                            border: `2px dashed`,
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            userSelect: 'none',
                        }}
                    >
                        Right-Click Here
                    </div>
                </ContextMenu>
            </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    menuItems: MENU_ITEMS
};
