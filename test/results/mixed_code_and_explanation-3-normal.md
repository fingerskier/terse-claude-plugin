## Recursive Flatten

The base idea: if an element is an array, recurse into it; otherwise, collect it.

```js
function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}
```

Each recursive call handles one level of nesting. `flatten([1, [2, [3, [4]]]])` returns `[1, 2, 3, 4]`.

**Tradeoff:** Simple and readable, but deep nesting can blow the call stack.

## Iterative Alternative

Replace the call stack with an explicit stack (or just mutate an index over a working copy):

```js
function flatten(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.push(item);
    }
  }
  return result.reverse(); // pop reverses order, so reverse at end
}
```

**Tradeoff:** No recursion depth limit, but `reverse()` is needed since `pop` processes back-to-front. You can avoid the reverse by using `shift()` instead of `pop()`, at the cost of O(n) shifts.

## Key differences

| | Recursive | Iterative |
|---|---|---|
| Readability | More intuitive | Slightly more mechanical |
| Stack safety | Risk of overflow on deep nesting | Safe at any depth |
| Performance | Function call overhead per level | Single loop, explicit stack |

**Built-in option:** `arr.flat(Infinity)` does this natively in modern JS.
