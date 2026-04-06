`data.results` is `undefined`. Either `data` lacks `results` key or `data` itself is undefined.

Fix: `const items = data?.results?.map(r => r.name) ?? []`

Or guard explicitly:

```js
if (data?.results) {
  const items = data.results.map(r => r.name)
}
```

Common causes: async data not yet loaded, API response shape changed, error response lacks `results` field.
