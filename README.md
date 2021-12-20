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
* [AnchorCopy](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-anchorcopy--anchor-copy)
* [BoundingBoxes](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-boundingboxes--bounding-boxes)
* [Breadcrumb](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-breadcrumb--breadcrumb)
* [Button](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-button--all-buttons)
* [Checkbox](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-checkbox--checkbox)
* [CheckboxGroup](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-checkboxgroup--checkbox-group)
* [Collapsible](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-collapsible--collapsible)
* [CopyButton](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-copybutton--copy-button)
* [Drawer](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-drawer--drawer)
* [Filter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-allfilters--no-filter-bar)
  * [AdditionalJSONFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-additionaljsonfilter--additional-json-filter)
  * [DoubleMultiSelectFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-doublemultiselectfilter--double-multi-select-filter)
  * [ListFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-listfilter--list-filter)
  * [MultiSelectFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-multiselectfilter--multi-select-filter)
  * [RadioFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-radiofilter--radio-filter)
  * [SingleSelectFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-singleselectfilter--single-select-filter)
  * [TextFilter](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-filter-textfilter--text-filter)
* [Header](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-header--header)
* [Input](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-input--placeholder)
* [ItemGrid](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-itemgrid--item-grid)
* [ItemResults](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-itemresults--item-results)
* [Loading](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-loading--loading)
* [MaskableImage](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-maskableimage--maskable-image)
* [Modal](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-modal--simple-modal)
  * [ConfirmationModal](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-modal-confirmationmodal--basic-confirm)
* [Page](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-page--page)
* [PlaybackBar](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-playbackbar--playback-bar)
* [Progress](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-progress-progressbar--progress-bar)
   * [Circular Progress](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-progress-circularprogress--circular-progress)
   * [Device Progress](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-progress-deviceprogress--device-progress-bar)
   * [Progress Bar](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-progress-progressbar--progress-bar)
* [RadioGroup](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-radiogroup--standard-radio-group)
* [RefreshToolBar](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-refreshtoolbar--refresh-toolbar)
* [Select](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-select--select)
* [SelectPopover](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-selectpopover--popover)
* [StackBanner](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stack-banner--stack-banner)
  * [StackBannerRow](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stack-banner-stack-banner-row--error)
* [StepFunctionAuthoring](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stepfunctionauthoring--new-step-function)
* [StepFunctionGraph](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stepfunctiongraph--simple-graph)
* [StepFunctionRenderer](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-stepfunctionrenderer--step-function-renderer)
* [Table](https://toyotaresearchinstitute.github.io/lakefront?path=/docs/lakefront-table--table)
* [Tabs](https://toyotaresearchinstitute.github.io/lakefront?path=/docs/lakefront-tabs--tabs)
* [TextArea](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-textarea--placeholder)
* [Toggle](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-toggle--toggle)
* [TypeaheadSearch](https://toyotaresearchinstitute.github.io/lakefront/?path=/docs/lakefront-typeaheadsearch--search-bottom-start)

## Contributing
If you want to contribute to the action, even by just raising a problem or proposing an idea, you can click [here](CONTRIBUTING.md) to find out how to do it.
