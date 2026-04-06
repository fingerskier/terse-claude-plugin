A **closure** is a function that retains access to variables from its enclosing scope, even after that scope has finished executing.

```js
function makeCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
```

`makeCounter` has returned, but the inner function still reads and mutates `count`. That binding is the closure.

## Why they matter

- **They're how JS scoping works.** Every function closes over its parent scope. You use closures constantly whether you realize it or not — callbacks, event handlers, `.then()` chains, `setTimeout`.
- **They enable private state.** JS has no true private fields on plain objects (class `#fields` aside). Closures give you encapsulation without classes.

## Intentional uses

**Data privacy / module pattern:**
```js
function createWallet(initial) {
  let balance = initial;
  return {
    spend(amount) { balance -= amount; },
    check() { return balance; },
  };
}
```
No outside code can touch `balance` directly.

**Partial application / factories:**
```js
function withBaseUrl(base) {
  return (path) => `${base}${path}`;
}
const api = withBaseUrl('https://example.com');
api('/users'); // https://example.com/users
```

**Preserving loop state** (classic gotcha):
```js
for (var i = 0; i < 3; i++) {
  setTimeout(((j) => () => console.log(j))(i), 100);
}
// 0, 1, 2 — not 3, 3, 3
```
(`let` fixes this naturally since it's block-scoped, but the underlying mechanism is still a closure.)

## The one thing to watch

Closures keep references alive. If a closure captures a large object you no longer need, it won't be garbage-collected. This rarely matters in practice, but it's the main cost.
