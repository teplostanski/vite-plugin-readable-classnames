---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vite Plugin<br>Readable Classnames"
  text: "Сделайте имена классов CSS-модулей понятными и читаемыми"
  tagline: "Плагин автоматически добавляет имя файла модуля и другую полезную информацию к именам классов для удобной разработки."
  image:
    src: /vite.svg
    alt: Vite logo
  actions:
    - theme: brand
      text: Поехали
      link: /ru/guide/
    - theme: alt
      text: Опции
      link: /ru/options/

features:
  - icon: ♻️
    title: Не зависит от фреймворка
    details: Проверено на проектах с ванильным JS/TS, React/Preact, Next, Vue, Nuxt и Astro
  - icon: ✨
    title: Универсальный
    details: Совместим с CommonJS и ES Modules
  - icon: 🔧
    title: Настраиваемый
    details: Гибкая настройка через объект параметров
---

## Начало работы

Добавьте плагин в свой проект, используя любимый пакетный менеджер!

::: code-group

```sh [npm]
npm install -D vite-plugin-readable-classnames
```

```sh [yarn]
yarn add -D vite-plugin-readable-classnames
```

```sh [pnpm]
pnpm add -D vite-plugin-readable-classnames
```

```sh [bun]
bun add -d vite-plugin-readable-classnames
```

:::

## Миграция с vite-plugin-pretty-module-classnames

`vite-plugin-readable-classnames` это новое имя для `vite-plugin-pretty-module-classnames`. Это руководство поможет мигрировать с `vite-plugin-pretty-module-classnames` на `vite-plugin-readable-classnames`.

1. Удалите старый плагин и установите новый

::: code-group

```sh [npm]
npm uninstall vite-plugin-pretty-module-classnames
npm install -D vite-plugin-readable-classnames
```

```sh [yarn]
yarn remove vite-plugin-pretty-module-classnames
yarn add -D vite-plugin-readable-classnames
```

```sh [pnpm]
pnpm remove vite-plugin-pretty-module-classnames
pnpm add -D vite-plugin-readable-classnames
```

```sh [bun]
bun remove vite-plugin-pretty-module-classnames
bun add -d vite-plugin-readable-classnames
```

:::

2. Обновите импорт и использование плагина в `vite.config.js` или `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames' // [!code --]
import readableClassnames from 'vite-plugin-readable-classnames' // [!code ++]

export default defineConfig {
  plugins: [prettyModuleClassnames()], // [!code --]
  plugins: [readableClassnames()], // [!code ++]
}
```
