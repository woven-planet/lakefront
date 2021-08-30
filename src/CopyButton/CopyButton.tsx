import { FC } from 'react';
import Button from 'src/Button/Button';
import { ButtonComponentProps } from 'src/Button/buttonUtil';
import copyClipboard from 'src/lib/util/copy';
import { ReactComponent as FileCopy } from './assets/fileCopy.svg';

export interface CopyButtonProps {
    buttonText?: string;
    className?: string;
    /**
     * A boolean that defines whether the anchor should be disabled.
     */
    disabled?: boolean;
    /**
     * The action to run on copy success.
     */
    onCopy?: (scrollToUrl: string) => void;
    valueToCopy: string;
}

/**
 * CopyButton Component
 *
 * The CopyButton component is
 */
const CopyButton: FC<CopyButtonProps & Omit<ButtonComponentProps, 'onCopy'>> = ({
    buttonText = 'Copy',
    disabled,
    onCopy,
    valueToCopy,
    children,
    ...props
}) => {
    return (
        <Button
            disabled={disabled}
            icon={<FileCopy />}
            onClick={
                disabled
                    ? () => null
                    : () => {
                          const success = copyClipboard(valueToCopy);

                          if (onCopy && success) {
                              onCopy(valueToCopy);
                          }
                      }
            }
            type="button"
            {...props}
        >
            {children || buttonText}
        </Button>
    );
};

export default CopyButton;
