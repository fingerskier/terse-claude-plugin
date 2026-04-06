`data.results` is `undefined`. Either `data` doesn't have a `results` property, or `data` itself is undefined/null.

Fix with optional chaining:

```js
const items = data?.results?.map(r => r.name) ?? []
```

Or guard explicitly:

```js
if (data?.results) {
  const items = data.results.map(r => r.name)
}
```

Check what `data` actually contains — `console.log(data)` — to find the root cause (wrong API response shape, async timing, typo in property name, etc.).
