import React, { ReactElement } from 'react';
import { ReactComponent as Flag } from './assets/flag.svg';
import { Theme } from '@emotion/react';

export const NORMAL_SEVERITY = 'normal';
export const WARNING_SEVERITY = 'warning';
export const ERROR_SEVERITY = 'error';
export const DEFAULT_SEVERITY = 'default';

export const DEFAULT_BACKGROUND_COLOR = 'transparent';

export const StackBannerStoryContent = {
  Error: 'Error: This should be addressed immediately.',
  Warning: 'Warning: Address as soon as possible.',
  Normal: 'Normal: Issues like this could be addressed.',
  Default: 'Default: Just some useful information.',
};

export type StackBannerIcon = ReactElement<SVGElement> | boolean | undefined;

interface SeverityColors {
  [key: string]: string;
}

export const getSeverityColor = (severity: string | undefined, theme?: Theme) => {
  const SEVERITY_COLORS: SeverityColors = {
    normal: theme?.colors?.white,
    warning: theme?.colors?.orange,
    error: theme?.colors?.red,
    default: DEFAULT_BACKGROUND_COLOR
  };

  if (!severity) {
    return DEFAULT_BACKGROUND_COLOR;
  }

  return SEVERITY_COLORS[severity] || DEFAULT_BACKGROUND_COLOR;
};

export const getStackBannerIcon = (icon: StackBannerIcon) => {
  if (typeof icon === 'boolean') {
    return icon && <Flag />;
  }

  return icon || <Flag />;
};
