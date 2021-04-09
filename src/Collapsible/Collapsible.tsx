import React, {
  ComponentPropsWithoutRef,
  FC,
  ReactElement,
  useState
} from "react";
import { ThemeProvider } from '@emotion/react';
import { StyledCollapsible } from "./collapsibleStyles";
import Button from "../Button/Button";
import { ReactComponent as ChevronUp } from "./assets/chevron-up.svg";
import { ReactComponent as ChevronDown } from "./assets/chevron-down.svg";
import theme from '../styles/theme';

export interface CollapsibleProps {
  /**
   * This is the initial display state of the component. When true, the child contents will be displayed.
   * When false, the child contents will be hidden.
   */
  expanded?: boolean;
  /**
   * This is an action to run when the expand state changes.
   */
  onChange?: () => void;
  /**
   * Typically a string, this is the content to show at the top left of the component.
   */
  title?: string | ReactElement;
  /**
   * Typically a string, this is the content to show at the top right of the component.
   */
  subtitle?: string | ReactElement;
  /**
   * `Default = false` This determines if a horizontal divider should be displayed between the
   * title and the child content.
   */
  divider?: boolean;
}

/**
 * Collapsible Component
 *
 * The Collapsible component can be used to make collapsible sections within a document.
 * The component takes in native div props as well as its own CollapsibleProps. The `expanded` prop
 * controls the initial state of the component. Once initialized, the state is managed within this component.
 *
 */
const Collapsible: FC<CollapsibleProps & Pick<ComponentPropsWithoutRef<"div">, Exclude<keyof ComponentPropsWithoutRef<"div">, keyof CollapsibleProps>>> = ({
  expanded = false,
  title = "",
  subtitle = "",
  divider = true,
  onChange,
  children,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleChange = () => {
    if (onChange) {
      onChange();
    }

    setIsExpanded(!isExpanded);
  };

  return (
    <ThemeProvider theme={theme}>
      {
        <StyledCollapsible {...props}>
          <div className="topCollapsible">
            <div className="title">{title}</div>
            <div className="subtitle">
              {subtitle}
              <Button
                onClick={handleChange}
                icon={isExpanded ? <ChevronUp /> : <ChevronDown />}
              />
            </div>
          </div>
          {divider && <div className="divider" />}
          <div className={`bottomCollapsible ${isExpanded ? 'expanded': 'collapsed'}`}>{children}</div>
        </StyledCollapsible>
      }
    </ThemeProvider>
  );
};

export default Collapsible;
