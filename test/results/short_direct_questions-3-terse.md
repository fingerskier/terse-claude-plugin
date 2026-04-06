

`structuredClone(obj)` — native, handles nested objects, arrays, dates, maps, sets, ArrayBuffers. Available in all modern runtimes.

Fallback for older envs: `JSON.parse(JSON.stringify(obj))` — loses `undefined`, functions, symbols, circular refs.

For objects with circular refs or class instances, use a lib like `lodash.cloneDeep`.
