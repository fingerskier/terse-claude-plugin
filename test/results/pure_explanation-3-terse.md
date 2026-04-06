

**Closure** = function retaining access to its lexical scope after outer function returns.

```js
function counter() {
  let n = 0
  return () => ++n
}
const c = counter() // c() → 1, 2, 3...
```

Inner fn "closes over" `n`. `n` persists as long as inner fn exists.

**Why they matter:**
- Data privacy — no direct access to `n` above
- State without classes — factory functions, module pattern
- Partial application — `const add5 = (b) => 5 + b` from `const adder = (a) => (b) => a + b`

**Intentional uses:**
- **Event handlers/callbacks** — capture context without globals
- **Memoization** — cache lives in closure scope
- **Iterators/generators** — maintain position state
- **Module pattern** — expose public API, hide internals
- **Currying** — transform multi-arg fn into chain of single-arg fns

**Gotcha:** closures in loops capture variable *ref*, not value. Classic `var` loop bug — fix with `let` (block-scoped) or IIFE.
