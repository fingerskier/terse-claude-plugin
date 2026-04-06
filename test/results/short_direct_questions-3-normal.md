`structuredClone(obj)` — built-in, handles nested objects, arrays, Dates, Maps, Sets, ArrayBuffers, etc.

```js
const copy = structuredClone(original);
```

Limitations: doesn't clone functions, DOM nodes, or prototype chains. For those edge cases, a recursive custom cloner or a library like lodash's `_.cloneDeep()` is needed.
