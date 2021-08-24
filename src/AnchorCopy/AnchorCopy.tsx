import { ComponentPropsWithoutRef, FC } from 'react';
import { generateScrollToUrl } from './anchorCopyUtil';
import styled from '@emotion/styled';
import copyClipboard from 'src/lib/util/copy';
import Button from 'src/Button/Button';
import { ReactComponent as Link } from './assets/link.svg';

export interface AnchorCopyProps {
    AnchorContent: FC;
    className?: string;
    disabled?: boolean;
    hashId?: string;
    onCopy?: (scrollToUrl: string) => void;
    title: string;
}

const AnchorDiv = styled.div({
    display: 'inline-flex',
    alignItems: 'center',
    button: {
        marginRight: 5
    }
});

const AnchorCopy: FC<AnchorCopyProps & Omit<ComponentPropsWithoutRef<'div'>, 'onCopy'>> = ({
    AnchorContent = Button,
    className,
    disabled,
    hashId,
    onCopy,
    title,
    ...props
}) => {
    const hash = hashId || title;

    return (
        <AnchorDiv
            className={className}
            {...props}
            onClick={
                disabled
                    ? () => null
                    : () => {
                          copyClipboard(generateScrollToUrl(hash));
                          if (onCopy) {
                              onCopy(generateScrollToUrl(hash));
                          }
                      }
            }
        >
            <AnchorContent disabled={disabled} icon={<Link />} />
            {title}
        </AnchorDiv>
    );
};

export default AnchorCopy;
