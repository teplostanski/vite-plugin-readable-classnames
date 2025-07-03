---
title: Опции
description: Настройки плагина vite-plugin-readable-classnames с параметрами lineNumber и separator и пример их использования.
---

# Опции

Плагин поддерживает гибкую настройку через объект параметров.
В настоящее время доступны следующие параметры:

- **`lineNumber`** — добавляет номер строки к имени класса (см. [Номер строки](./line-number.md)).
- **`separator`** — позволяет изменить разделители между частями имени класса (см. [Разделители](./separator.md)).

Пример использования:

```js
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [
    readableClassnames({
      lineNumber: true,
      separator: {
        beforeClassName: '--'
      }
    })
  ]
})
```
