`data.results` is `undefined`. Either `data` itself is `undefined`/`null`, or it doesn't have a `results` property.

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

Check what `data` actually contains (`console.log(data)`) to find the root cause — likely an API response that doesn't match the expected shape.
