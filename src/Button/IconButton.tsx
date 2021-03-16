import React, { FC, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { IconComponentProps } from './buttonUtil';
import styled from '@emotion/styled';

interface IconSpanProps {
    iconPosition: 'left' | 'right' | undefined;
    isIconOnly: boolean;
}

const IconSpan = styled.span<IconSpanProps>(({ iconPosition, isIconOnly }) => {
    const positionalMargin = iconPosition === 'left' ? 'auto 10px auto 15px' : 'auto 15px auto 10px';

    return {
        display: 'inline-flex',
        alignItems: 'center',
        margin: isIconOnly ? undefined : positionalMargin,
        'span.iconChild': {
            display: 'inline-flex'
        }
    };
});

/**
 * Icon Component
 *
 * The Icon component takes icon and iconPosition.
 * The icon will be displayed along side any provided children.
 * The iconPosition, determines if the icon precedes or proceeds the provided children.
 *
 */
const IconButton: FC<IconComponentProps> = ({ icon, children, iconPosition }) => {
    const iconKey = useMemo(() => uuid(), []);
    const components = [<span className="iconChild" key={iconKey}>{icon}</span>, children && <span className="iconChild">{children}</span>];

    if (iconPosition === 'right') {
        components.reverse();
    }

    const [firstComponent, secondComponent] = components;

    return (
        <IconSpan iconPosition={iconPosition} isIconOnly={Boolean(!children)}>
            {firstComponent}
            {secondComponent}
        </IconSpan>
    );
};

export default IconButton;
