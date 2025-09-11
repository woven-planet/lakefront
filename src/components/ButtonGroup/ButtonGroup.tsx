import { ComponentPropsWithRef, FC, forwardRef, ReactNode } from 'react';
import { ButtonGroupContainer } from 'src/components/ButtonGroup/buttonGroupStyles';
import Button, { ButtonProps } from 'src/components/Button';

export interface ButtonGroupProps {
  /**
   * Whether to style buttons as a connected toggle group and maintain toggle state.
   */
  mode: 'toggle' | 'group';
  /**
   * Which button (id) should be selected/active.
   */
  selected?: string;
  /**
   * Props for each button.
   */
  buttonConfigs: (ButtonProps & { id: string, label: ReactNode })[];
  /**
   * The classes to pass to the component.
   */
  className?: string;
}

/**
 * ButtonGroup Component
 *
 * The ButtonGroup component is a convenience wrapper for grouping multiple lakefront Buttons
 * to closely connect actions and/or create toggle/mode like behavior.
 *
 */
const ButtonGroup: FC<ButtonGroupProps & ComponentPropsWithRef<'div'>> = forwardRef(({
  className,
  mode,
  selected,
  buttonConfigs,
  ...props
}, ref) => {
  return (
    <ButtonGroupContainer className={className} ref={ref} {...props}>
      {buttonConfigs.map(({ id, label, ...buttonProps }) => (
        <Button id={id} key={id} {...buttonProps}>
          {label}
        </Button>
      ))}
    </ButtonGroupContainer>
  );
});

export default ButtonGroup;