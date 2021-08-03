import { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import ModalComponent, { ModalProps } from 'src/Modal/Modal';
import DocBlock from '.storybook/DocBlock';
import Button from 'src/Button/Button';

export default {
    title: 'Lakefront/Modal',
    component: ModalComponent,
    argTypes: {
        // title: {
        //     control: {
        //         type: 'text'
        //     }
        // },
        // subtitle: {
        //     control: {
        //         type: 'text'
        //     }
        // },
        // onChange: {
        //     action: 'changed',
        //     table: {
        //         disable: true
        //     }
        // },
        // children: {
        //     table: {
        //         disable: true
        //     }
        // }
    },
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<ModalProps & ComponentPropsWithoutRef<'div'>> = (
  args
) => {
  const [visible, setVisible] = useState(false);

  const updateModalVisibility = () => {
    setVisible(isVisible => !isVisible);
  };

  return (
    <div>
      <Button onClick={updateModalVisibility}>Launch Modal</Button>
      <ModalComponent
        {...args}
        handleClose={updateModalVisibility}
        isOpen={visible}
        actionButton={<Button onClick={updateModalVisibility}>Confirm</Button>}
      >
          <div>
            Confirm that this is the <strong>{args.headerText}</strong> modal?
          </div>
      </ModalComponent>
    </div>
  );
};

export const SimpleModal = Template.bind({});
SimpleModal.args = {
  headerText: 'Simple Modal',
  subHeaderText: 'Created with simplicity in mind.',
  isCloseIconVisible: true,
  // cancelButtonText: 'Cancel',
  // showTopDivider: true,
  // showBottomDivider: true
  dialogWidth: 'md',
  renderInPortal: false
};

// export const NonCollapsible = Template.bind({});
// NonCollapsible.args = {
//   expanded: true,
//   title: 'Non Collapsible Component',
//   subtitle: <div>Additional Info | <strong>100</strong> Count | Updated <strong>Today</strong></div>,
//   collapsible: false
// };
