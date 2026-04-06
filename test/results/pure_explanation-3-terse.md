

**Closure** = function retaining access to its lexical scope after outer function returns.

```js
function counter() {
  let n = 0;
  return () => ++n;
}
const c = counter(); // c() → 1, 2, 3...
```

**Why they matter:** enable private state, data encapsulation without classes.

**Intentional uses:**
- **Data privacy** — module pattern, factory functions w/ hidden internals
- **Partial application / currying** — `const add5 = x => x + 5`
- **Callbacks/event handlers** — capture context at creation time
- **Memoization** — cache lives in closure scope
- **Iterators/generators** — maintain iteration state

**Gotcha:** closures in loops capture variable *ref*, not value. Fix w/ `let` (block-scoped) or IIFE.
