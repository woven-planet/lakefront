import styled from '@emotion/styled';

interface CopyButtonContentProps {
    hasContent: boolean;
}

export const CopyButtonContent = styled.div<CopyButtonContentProps>(({ hasContent }) => ({
    paddingLeft: hasContent ? 8 : 0
}));
