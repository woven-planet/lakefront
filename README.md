![main workflow](https://github.com/ToyotaResearchInstitute/lakefront/actions/workflows/main.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40toyota-research-institute%2Flakefront.svg)](https://badge.fury.io/js/%40toyota-research-institute%2Flakefront)

# lakefront
Lakefront is a simple React component library.

## Installation

Lakefront is available as an [npm package](https://www.npmjs.com/package/@toyota-research-institute/lakefront).

```sh
// with npm
npm install @toyota-research-institute/lakefront

// with yarn
yarn add @toyota-research-institute/lakefront
```

Emotion's `ThemeProvider` must wrap your application for the components to style correctly.
```
import { ThemeProvider } from '@emotion/react';
import { theme } from '@toyota-research-institute/lakefront';

<ThemeProvider theme={theme}>
    ...
</ThemeProvider>
```

## Usage

Here is a quick example to get you started, **it's all you need**:

```jsx
import ReactDOM from 'react-dom';
import { Button } from '@toyota-research-institute/lakefront';

function App() {
  return <Button>Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Components
We've added storybook pages to show how each component can be used.
* [Button](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-button--all-buttons)
* [Checkbox](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-checkbox--checkbox)
* [Collapsible](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-collapsible--collapsible)
* [Filter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter--all-filters)
  * [ListFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-listfilter--list-filter)
  * [RadioFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-radiofilter--radio-filter)
  * [SingleSelectFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-singleselectfilter--single-select-filter)
  * [TextFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-textfilter--text-filter)
* [Input](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-input--placeholder)
* [Loading](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-loading--loading)
* [RadioGroup](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-radiogroup--standard-radio-group)
* [SelectPopover](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-selectpopover--popover)
* [StackBanner](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stack-banner--stack-banner)
  * [StackBannerRow](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stack-banner-stack-banner-row--error)
* [StepFunctionGraph](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stepfunctiongraph--simple-graph)
* [TextArea](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-textarea--placeholder)
* [Toggle](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-toggle--toggle)

## Contributing
If you want to contribute to the action, even by just raising a problem or proposing an idea, you can click [here](CONTRIBUTING.md) to find out how to do it.
