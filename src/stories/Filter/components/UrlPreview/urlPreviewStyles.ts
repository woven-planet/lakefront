import styled from '@emotion/styled';
import Input from 'src/components/Input/Input';

export const PreviewBar = styled(Input)({
    width: '100%',
    backgroundColor: 'white'
});

export const UrlPreviewContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    label: {
        flex: 1,
        margin: '1em'
    }
});
