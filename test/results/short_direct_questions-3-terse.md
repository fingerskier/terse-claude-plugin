

`structuredClone(obj)` — built-in, handles nested objects, arrays, dates, maps, sets, arraybuffers. Works in all modern runtimes.

Fallback for old envs: `JSON.parse(JSON.stringify(obj))` — loses `undefined`, functions, symbols, circular refs.

For objects with circular refs or class instances, use a lib like `lodash.cloneDeep`.
