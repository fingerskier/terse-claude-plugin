

`structuredClone(obj)` — built-in, handles nested objects, arrays, dates, maps, sets, and circular references.

```js
const copy = structuredClone(original);
```

Limitations: doesn't clone functions, DOM nodes, or prototype chains. For those cases, use a library like lodash's `_.cloneDeep()`.
