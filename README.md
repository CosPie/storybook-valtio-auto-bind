# Storybook Valtio Auto Bind

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/cospie/storybook-valtio-auto-bind/node.js.yml)
[![Node.js CI](https://github.com/CosPie/storybook-valtio-auto-bind/actions/workflows/node.js.yml/badge.svg)](https://github.com/CosPie/storybook-valtio-auto-bind/actions/workflows/node.js.yml)
[![pages](https://github.com/CosPie/storybook-valtio-auto-bind/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/CosPie/storybook-valtio-auto-bind/actions/workflows/pages/pages-build-deployment)
[![codecov](https://codecov.io/gh/CosPie/storybook-valtio-auto-bind/graph/badge.svg?token=3X6NKW23PY)](https://codecov.io/gh/CosPie/storybook-valtio-auto-bind)
[![npm version](https://img.shields.io/npm/v/storybook-valtio-auto-bind.svg)](https://www.npmjs.com/package/storybook-valtio-auto-bind)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Easily enable two-way binding between [Storybook Controls](https://storybook.js.org/docs/essentials/controls) and [Valtio](https://github.com/pmndrs/valtio) state management. This library provides decorators to synchronize Storybook args with Valtio stores, making it seamless to manage and preview state changes in your components.

---

## Features

- 🔄 **Two-Way Binding**: Sync Storybook args with Valtio stores.
- ⚡ **Lightweight**: Minimal overhead with efficient state updates.
- 🛠️ **Customizable**: Extendable for advanced use cases.

---

## Installation

Install the package via npm or yarn:

```bash
npm install storybook-valtio-auto-bind valtio -D
# or
yarn add storybook-valtio-auto-bind valtio -D
```

---

## Usage

### 1. Add the Decorators

Import and add the provided decorators to your Storybook configuration:

```tsx
// .storybook/preview.tsx
import { ValtioStorybookTwoWayBindingDecorators } from 'storybook-valtio-auto-bind';

export const decorators = [...ValtioStorybookTwoWayBindingDecorators];
```

### 2. Bind a Valtio Store to a Story

Use the `withStores` helper to bind Valtio stores to your stories:

```tsx
import { proxy } from 'valtio';
import { withStores } from 'storybook-valtio-auto-bind';

const counterStore = proxy({ count: 0 });

export default {
  title: 'Example/Counter',
};

export const Counter = withStores(
  { counter: counterStore },
  (args) => <button onClick={() => counterStore.count++}>{args.counter.count}</button>
);
```

### 3. Observe Two-Way Binding

- Adjust the `count` value in Storybook Controls.
- Observe the changes reflected in the UI and the Valtio store.

---

## API

### `withStores(stores, story)`

- **`stores`**: An object mapping store names to Valtio stores.
- **`story`**: The Storybook story function.

### Decorators

- **`ValtioStoreBindStory`**: Syncs Valtio store changes to Storybook args.
- **`StoryBindValtioStoreDecorator`**: Syncs Storybook args to Valtio stores.

---

## Example

```tsx
import { proxy } from 'valtio';
import { withStores } from 'storybook-valtio-auto-bind';

const store = proxy({ text: 'Hello, Storybook!' });

export const Example = withStores(
  { store },
  (args) => <input value={args.store.text} onChange={(e) => (store.text = e.target.value)} />
);
```

---

## Acknowledgments

- [Valtio](https://github.com/pmndrs/valtio) for the reactive state management.
- [Storybook](https://storybook.js.org/) for the amazing UI development environment.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
