import { FC } from 'react';
import Button from 'src/Button/Button';
import { ButtonComponentProps } from 'src/Button/buttonUtil';
import copyClipboard from 'src/lib/util/copy';
import { ReactComponent as FileCopy } from './assets/fileCopy.svg';

export const COPY_TEXT = 'Copy';

export interface CopyButtonProps {
    /**
     * `Default = "Copy"` The text to display within the button.
     */
    buttonText?: string;
    /**
     * The classes to pass to the bounding boxes container.
     */
    className?: string;
    /**
     * A boolean that defines whether the anchor should be disabled.
     */
    disabled?: boolean;
    /**
     * The action to run on copy success.
     */
    onCopy?: (scrollToUrl: string) => void;
    /**
     * The value to be copied to the clipboard.
     */
    valueToCopy: string;
}

/**
 * CopyButton Component
 *
 * The CopyButton component is an implementation of the [Button Component](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-button--all-buttons)
 * used specifically for copying provided text to the clipboard. While the default usage should suffice, various aspects can be overriden
 * due to the inheritance of many `ButtonComponentProps`.
 */
const CopyButton: FC<CopyButtonProps & Omit<ButtonComponentProps, 'onCopy'>> = ({
    buttonText = COPY_TEXT,
    disabled,
    onCopy,
    valueToCopy,
    children,
    ...props
}) => {
    return (
        <Button
            disabled={disabled}
            icon={<FileCopy aria-label="File Copy" />}
            onClick={
                disabled
                    ? undefined
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
