<div align='center'>
  <img src="https://cdn.simpleicons.org/vite/9135FF" alt="Vite" width="24" height="24" />
  <h1>vite-plugin-readable-classnames</h1>

  <p>
    <samp>
      <a href="https://vite-plugin-readable-classnames.js.org">docs</a>
      <span> · </span>
      <a href="https://npmx.dev/package/vite-plugin-readable-classnames">npmx.dev</a>
      <span> · </span>
      <a href="https://github.com/teplostanski/vite-plugin-readable-classnames">github</a>
      <span> · </span>
      <a href="https://codeberg.org/teplostanski/vite-plugin-readable-classnames/src/branch/main/README.md">codeberg</a>
      <span> · </span>
      <a href="https://donate.teplostanski.me">fund this package</a>
    </samp>
  </p>

[![Open on npmx.dev](https://npmx.dev/api/registry/badge/version/vite-plugin-readable-classnames?labelColor=1f2033)](https://npmx.dev/package/vite-plugin-readable-classnames)
[![Open on npmx.dev](https://npmx.dev/api/registry/badge/downloads-month/vite-plugin-readable-classnames?labelColor=1f2033)](https://npmx.dev/package/vite-plugin-readable-classnames)
[![Open on npmx.dev](https://npmx.dev/api/registry/badge/dependencies/vite-plugin-readable-classnames?labelColor=1f2033)](https://npmx.dev/package/vite-plugin-readable-classnames)
[![Open on npmx.dev](https://npmx.dev/api/registry/badge/vulnerabilities/vite-plugin-readable-classnames?labelColor=1f2033)](https://npmx.dev/package/vite-plugin-readable-classnames)
[![Open on npmx.dev](https://npmx.dev/api/registry/badge/deprecated/vite-plugin-readable-classnames?labelColor=1f2033)](https://npmx.dev/package/vite-plugin-readable-classnames)
[![Open on npmx.dev](https://npmx.dev/api/registry/badge/updated/vite-plugin-readable-classnames?labelColor=1f2033)](https://npmx.dev/package/vite-plugin-readable-classnames)
![Github Tests Status](https://img.shields.io/github/actions/workflow/status/teplostanski/vite-plugin-readable-classnames/test.yml?label=tests&labelColor=1f2033&color=22c55e&style=flat)
![Github Tests Status](https://img.shields.io/codecov/c/gh/teplostanski/vite-plugin-readable-classnames?label=coverage&labelColor=1f2033&color=22c55e&style=flat)

  <samp>English • <a href="https://vite-plugin-readable-classnames.js.org/ru">Russian</a></samp>

  <p>Make your scoped CSS module class names clear and readable — this plugin automatically adds the module filename and other useful info to class names for easier development.</p>

  <p>Included in the <a href='https://github.com/vitejs/awesome-vite'>Awesome Vite.js list <img src='https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg' alt='Awesome'></a></p>
</div>

- [Installation](#installation)
- [Documentation for Humans](#documentation-for-humans)
- [Features](#features)
- [Problem](#problem)
- [Usage](#usage)
  - [`lineNumber` option](#linenumber-option)
  - [`separator` option](#separator-option)
- [Migration from `vite-plugin-pretty-module-classnames`](#migration-from-vite-plugin-pretty-module-classnames)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install -D vite-plugin-readable-classnames
# or
yarn add -D vite-plugin-readable-classnames
# or
pnpm add -D vite-plugin-readable-classnames
# or
bun add -d vite-plugin-readable-classnames
```

<br>

## Documentation for Humans

[vite-plugin-readable-classnames.js.org](https://vite-plugin-readable-classnames.js.org)

<br>

## Features

- Framework-agnostic:

    ![VanillaJS](https://img.shields.io/badge/Vanilla_JS_%2F_TS-%231f2033.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React/Preact](https://img.shields.io/badge/react_%2F_preact-%231f2033.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vue](https://img.shields.io/badge/vue-%231f2033.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![Next](https://img.shields.io/badge/Next-%231f2033.svg?style=for-the-badge&logo=nextdotjs&logoColor=%23FFFFFF) ![Nuxt](https://img.shields.io/badge/Nuxt-%231f2033.svg?style=for-the-badge&logo=nuxt&logoColor=%2300DC82) ![Astro](https://img.shields.io/badge/Astro-%231f2033.svg?style=for-the-badge&logo=astro&logoColor=%23BC52EE)
- Universal:
  - Compatible with both `CommonJS` and `ES Modules`
  - Support `Vite 2.x`
- Customizable: Flexible configuration through options object
- Zero Dependencies

<br>

## Problem

In React with CSS modules, we're used to class names like `SomeComponent__classname_hash`. By default, Vite generates names in the format `__classname_hash`, omitting the component name, which makes debugging more difficult.

If you try to add the component name through the `generateScopedName: '[name]__[local]_[hash:base64:5]'` configuration, React will add an extra `-module` suffix, and in Vue, such configuration may lead to build errors.

This plugin solves these problems and ensures predictable, readable class naming in the format `ComponentName__classname_hash` regardless of the framework.

> [!TIP]
> **What are generated class names and where are they visible?**
>
> When you use CSS modules, the resulting class names are automatically generated by the bundler (e.g., Vite or Webpack). These names are visible:
>
> - in the HTML code of the page (through browser DevTools);
> - in the final CSS file;
> - when debugging in the browser as you search for the right element or style.
>
> Readable class names that include the component name help you quickly understand where a style comes from, making debugging and project maintenance easier.

<br>

## Usage

```js
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [
    readableClassnames()
  ]
})
```

### `lineNumber` option

The `lineNumber` option adds the line number where the class is declared in the source file to the class name.

```js
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [readableClassnames({ lineNumber: true })],
})
```

If your CSS file looks like this:

```css [SomeComponent.module.css]
1 .wrapper {
2   /* styles */
3 }
4
5 .container {
6   /* styles */
7 }
```

The resulting class names will be:

- `SomeComponent__wrapper_abcd1-1`
- `SomeComponent__container_abcd2-5`

<br>

> [!IMPORTANT] Please note:
> The `lineNumber` option works the same way as Vite's standard class name generation when using preprocessors (Sass, Less, Stylus). The line number is taken from the generated CSS, where empty lines and comments are usually removed. Therefore, the line numbers in class names may not match the line numbers in the source files.
>
> In `.vue` files, line counting always starts from the `<style module>` tag, regardless of where it is located in the file. So the line number in the class name will be counted from the beginning of the `<style module>` block, not from the beginning of the entire file.

<br>

### `separator` option

The `separator` option allows you to customize the characters used to join parts of the generated class name.  
You can override any of the following fields (all are optional, default values are shown below):

| Field               | Default      | Description                                          |
|---------------------|--------------|------------------------------------------------------|
| `beforeHash`        | `'_'`        | Separator before the hash part                       |
| `beforeClassName`   | `'__'`       | Separator between the file name and class name       |
| `beforeLineNumber`  | `'-'`        | Separator before the line number (if enabled)        |

```js
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [
    readableClassnames({
      separator: {
        beforeClassName: '--', // Uses double dash instead of double underscore
      }
    })
  ]
})
```

In this case, class names will look like:
`SomeComponent--classname_abcd1`

> [!TIP]
> You can specify only the fields you want to override; the rest will use the default values.

<br>

## Migration from `vite-plugin-pretty-module-classnames`

`vite-plugin-readable-classnames` is the new identity for `vite-plugin-pretty-module-classnames`. This guide will help you migrate from `vite-plugin-pretty-module-classnames` to `vite-plugin-readable-classnames`.

1. Uninstall the old plugin and install the new one

```sh [npm]
npm uninstall vite-plugin-pretty-module-classnames
npm install -D vite-plugin-readable-classnames
```

2. Update the import and plugin usage in your `vite.config.js` or `vite.config.ts`

```diff
- import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames'
+ import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig {
-  plugins: [prettyModuleClassnames()]
+  plugins: [readableClassnames()]
}
```

<br>

## Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise [issues on GitHub](https://github.com/teplostanski/vite-plugin-readable-classnames/issues).

Before you contribute to the development of the project, read the [rules](https://github.com/teplostanski/vite-plugin-readable-classnames/blob/main/CONTRIBUTING.md).

Thanks again for your support, it is much appreciated! 🙏

<br>

## License
<a href="https://github.com/teplostanski/vite-plugin-readable-classnames/blob/main/LICENSE">MIT</a> License © 2024-present <a href="https://github.com/teplostanski">Igor Teplostanski</a>

<br>
<br>

<div>
  <a href="https://donate.teplostanski.me" target="_blank">
    <img src="https://src.teplostanski.me/fund-this-package.svg" alt="Fund This Package ❤">
  </a>
</div>
