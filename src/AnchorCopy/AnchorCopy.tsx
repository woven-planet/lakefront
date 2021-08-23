import { ComponentPropsWithoutRef, FC } from 'react';
import { generateScrollToUrl } from './anchorCopyUtil';
import styled from '@emotion/styled';
import copyClipboard from 'src/lib/util/copy';
import Button from 'src/Button/Button';
import { ReactComponent as Link } from './assets/link.svg';

export interface AnchorCopyProps {
    title: string;
    hashId?: string;
    className?: string;
    onCopy?: (scrollToUrl: string) => void;
    AnchorContent: FC;
}

const AnchorDiv = styled.div({
    display: 'inline-flex',
    alignItems: 'center',
    button: {
        marginRight: 5
    }
});

const AnchorCopy: FC<AnchorCopyProps & Omit<ComponentPropsWithoutRef<'div'>, 'onCopy'>> = ({
    title,
    hashId,
    className,
    onCopy,
    AnchorContent = Button,
    ...props
}) => {
    const hash = hashId || title;

    return (
        <AnchorDiv
            className={className}
            {...props}
            onClick={() => {
                // copyClipboard(generateScrollToUrl(hash));
                if (onCopy) {
                    onCopy(generateScrollToUrl(hash));
                }
            }}
        >
            <AnchorContent icon={<Link />} />
            {title}
        </AnchorDiv>
    );
};

export default AnchorCopy;
