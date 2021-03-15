import { FC } from 'react';
import ButtonVariants from './buttonVariants';
import IconButton from './IconButton';
import {
    ButtonComponentProps,
    COLORS,
    ICON_BUTTON_COLOR,
    ICON_NAMES,
    InvalidButtonColorError,
    shouldUseMappedIcon
} from './buttonUtil';

/**
 * Button Component
 *
 * The Button component takes a color and an alt prop, as well as all native button props.
 * The color prop, which defaults to primary, determines its overall color scheme.
 * The alt prop inverts the color scheme to look better on dark backgrounds.
 * className will properly apply itself, but the CSS may need to be more specific,
 * such as button.MyClass instead of just .MyClass.
 *
 * The button can also include an icon configuration to include an icon. The icon configuration includes
 * a name, an optional tooltip, and an optional position. The name, which defaults to 'help', determines which icon to display along side any
 * provided children. If provided, the tooltip will cause the provided text to be displayed
 * when hovering over the button. The position, which defaults to 'left', determines if
 * the icon precedes or proceeds the provided children.
 */
const Button: FC<ButtonComponentProps> = ({
    alternate = false,
    color = COLORS.PRIMARY,
    children,
    icon = false,
    iconPosition = 'left',
    ...props
}) => {
    // Like in the Icon version, we return a styled component based on the color type
    const ButtonComponent = ButtonVariants[color];

    return (
        <ButtonComponent
            alternate={alternate}
            icon={icon}
            iconPosition={iconPosition}
            {...props}
        >
            {children}
        </ButtonComponent>
    );
};

export default Button;
