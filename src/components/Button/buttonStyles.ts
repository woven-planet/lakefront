import styled from '@emotion/styled';

interface StyledDivProps {
  disable: boolean;
}

export const StyledDiv = styled('div')<StyledDivProps>(({ disable }) => ({
  display: 'inline-block',
  textAlign: 'center',
  '& > div.icon-label': { opacity: disable ? 0.4 : 1 }
}));
