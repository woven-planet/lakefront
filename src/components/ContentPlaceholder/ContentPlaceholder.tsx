import { FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

export interface ContentPlaceholderProps {
  /**
   * The classes to pass to the component.
   */
  className?: string;
}

/**
 * ContentPlaceholder Component
 *
 * The ContentPlaceholder component (also referred to as a "content-loader" or "skeleton") can be used to indicate
 * when text, list, and other content is being loaded, generally representing how much content is expected to display
 * once loading is complete.
 *
 */
const ContentPlaceholder: FC<ContentPlaceholderProps> = ({ className }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={className}>
        content here
      </div>
    </ThemeProvider>
  );
};

export default ContentPlaceholder;
