Русский | [English](./README.md)

<div align='center'>
<h1>vite-plugin-readable-classnames</h1>

[<img alt="NPM Version" src="https://img.shields.io/npm/v/vite-plugin-readable-classnames?style=flat-square&color=07912E&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-readable-classnames)
[<img alt="NPM License" src="https://img.shields.io/npm/l/vite-plugin-readable-classnames?style=flat-square&color=D3748F&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-readable-classnames)
[<img alt="NPM Type Definitions" src="https://img.shields.io/npm/types/vite-plugin-readable-classnames?style=flat-square&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-readable-classnames)
[<img alt="NPM Downloads" src="https://img.shields.io/npm/dw/vite-plugin-readable-classnames?style=flat-square&color=7F78D1&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-readable-classnames)
[<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/teplostanski/vite-plugin-readable-classnames?style=flat-square&labelColor=1f2033">](https://github.com/teplostanski/vite-plugin-readable-classnames)
[<img alt="Coverage" src="https://codecov.io/gh/teplostanski/vite-plugin-readable-classnames/graph/badge.svg?token=CQY9WXG41L">](https://codecov.io/gh/teplostanski/vite-plugin-readable-classnames)

</a>

<h3>Сделайте имена классов CSS-модулей понятными и читаемыми — плагин автоматически добавляет имя файла модуля и другую полезную информацию к именам классов для удобной разработки.</h3>

<p>
Входит в <a href='https://github.com/vitejs/awesome-vite'>список Awesome Vite.js <img src='https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg' alt='Awesome'></a>
</p>
</div>

## 📦 Установка

[npmjs.com](https://npmjs.com/package/vite-plugin-readable-classnames) • [yarnpkg.com](https://yarnpkg.com/package?q=vite-plugin-readable-classnames&name=vite-plugin-readable-classnames)

```bash
npm install -D vite-plugin-readable-classnames

yarn add -D vite-plugin-readable-classnames

pnpm add -D vite-plugin-readable-classnames

bun add -d vite-plugin-readable-classnames
```

## Миграция с vite-plugin-pretty-module-classnames

`vite-plugin-readable-classnames` это новое имя для `vite-plugin-pretty-module-classnames`. Это руководство поможет мигрировать с `vite-plugin-pretty-module-classnames` на `vite-plugin-readable-classnames`.

1. Удалите старый плагин и установите новый

```sh [npm]
npm uninstall vite-plugin-pretty-module-classnames
npm install -D vite-plugin-readable-classnames
```

2. Обновите импорт и использование плагина в `vite.config.js` или `vite.config.ts`

```diff
- import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames'
+ import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig {
-  plugins: [prettyModuleClassnames()]
+  plugins: [readableClassnames()]
}
```

## 🦾 Функциональность

- Не зависит от фреймворка:
  - Проверено на проектах с ![VanillaJS](https://img.shields.io/badge/Vanilla_JS/TS-%231f2033.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%231f2033.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vue](https://img.shields.io/badge/vue-%231f2033.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![Astro](https://img.shields.io/badge/Astro-%231f2033.svg?style=for-the-badge&logo=astro&logoColor=%23BC52EE)
  - Потенциально работает с любым фреймворком. Если возникнут проблемы — создайте [issue](https://github.com/teplostanski/vite-plugin-readable-classnames/issues)
- Универсальный:
  - Совместим с `CommonJS` и `ES Modules`
  - Совместим с `Vite 2.x`
- Настраиваемый: Гибкая настройка через объект параметров

## 🤔 Какую проблему решает плагин?

В React с CSS-модулями мы привыкли к именам классов вроде `SomeComponent__classname_hash`. По умолчанию Vite генерирует имена в формате `__classname_hash`, опуская имя компонента, что усложняет отладку.

Если попытаться добавить имя компонента через настройку `generateScopedName: '[name]__[local]_[hash:base64:5]'`, в React появится лишний суффикс `-module`, а во Vue такая конфигурация может привести к ошибкам сборки.

Плагин решает эти проблемы и обеспечивает предсказуемое, читаемое именование классов в формате `ComponentName__classname_hash` независимо от фреймворка.

> [!TIP]
> **Что такое сгенерированные имена классов и где они видны?**
>
> Когда вы используете CSS-модули, итоговые имена классов автоматически генерируются сборщиком (например, Vite или Webpack). Эти имена видны:
> - в HTML-коде страницы (через DevTools браузера);
> - в итоговом CSS-файле;
> - при отладке в браузере, когда вы ищете нужный элемент или стиль.
>
> Хорошо читаемые имена классов с именем компонента помогают быстро понять, откуда стиль, и упростить отладку и поддержку проекта.

## ⚙️ Применение

###### Пример

```js
// vite.config.js
// ...
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [readableClassnames()],
})
```

## 📚 Документация

Полная документация доступна на [vite-plugin-readable-classnames.teplostan.ski](https://vite-plugin-readable-classnames.teplostan.ski/ru/) [ EN | RU ].

## 🤝 Вклад в проект

Хотите помочь проекту? Здорово! Поставьте звёздочку, расскажите друзьям или создайте [issue на GitHub](https://github.com/teplostanski/vite-plugin-readable-classnames/issues).

Перед тем как вносить изменения, ознакомьтесь с [правилами](https://github.com/teplostanski/vite-plugin-readable-classnames/blob/main/CONTRIBUTING.md).

Спасибо за вашу поддержку! 🙏

<h2> © Лицензия</h2>
<a href="https://github.com/teplostanski/vite-plugin-readable-classnames/blob/main/LICENSE">MIT</a> License © 2024-2025 <a href="https://github.com/teplostanski">teplostanski</a>

<h2> ❤ Поддержать проект</h2>
<a href="https://donate.teplostan.ski" target="_blank">donate.teplostan.ski</a> 
