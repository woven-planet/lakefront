![main workflow](https://github.com/ToyotaResearchInstitute/lakefront/actions/workflows/main.yml/badge.svg)

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
* [Button](https://toyotaresearchinstitute.github.io/lakefront/?path=/story/example-button--primary)
