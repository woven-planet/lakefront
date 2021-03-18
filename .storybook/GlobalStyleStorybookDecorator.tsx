import GlobalStyles from '../src/styles/GlobalStyles';

const GlobalStyleStorybookDecorator = (storyFn: any) => {
    return (
        <GlobalStyles>
            {storyFn()}
        </GlobalStyles>
    );
};

export default GlobalStyleStorybookDecorator;
