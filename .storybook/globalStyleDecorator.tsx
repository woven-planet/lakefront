import GlobalStyles from "../src/styles/GlobalStyles";

const GlobalStyleDecorator = (storyFn) => {
    return <GlobalStyles>{ storyFn() }</GlobalStyles>
};

export default GlobalStyleDecorator;
