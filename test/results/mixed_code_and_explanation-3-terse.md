## Flatten Nested Array

**Recursive:** base case = not array → return wrapped. Otherwise spread-concat recursive calls on each element.

```js
const flatten = arr => arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? flatten(v) : v), [])
```

**Iterative:** stack-based. Push items, pop and check — array? push children. Else collect.

```js
const flatten = arr => {
  const stack = [...arr], result = []
  while (stack.length) {
    const v = stack.pop()
    Array.isArray(v) ? stack.push(...v) : result.push(v)
  }
  return result.reverse()
}
```

**Key tradeoffs:**
- Recursive: clean, but stack overflow on very deep nesting (~10k+ levels)
- Iterative: heap-allocated stack, no depth limit
- Built-in: `arr.flat(Infinity)` — use this in practice
