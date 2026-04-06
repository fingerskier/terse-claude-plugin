A **closure** is a function that retains access to variables from its enclosing scope, even after that outer function has finished executing.

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

`makeCounter` has returned, but the inner function still reads and mutates `count`. That binding is "closed over" — hence *closure*.

## Why they matter

- **They're how JS scoping works.** Every function that references an outer variable forms a closure. You use them constantly whether you realize it or not — callbacks, event handlers, `.map()/.filter()` lambdas.
- **They enable private state.** JS has no built-in access modifiers (outside classes with `#private`). Closures let you hide variables from outside access while exposing controlled interfaces.
- **They preserve context.** Async code, timers, and event listeners run later but still need the variables from when they were created.

## When you'd use one intentionally

1. **Data privacy / encapsulation** — module pattern, factory functions that expose methods but hide internals.
2. **Partial application / currying** — `const add5 = makeAdder(5)` where `makeAdder` closes over the first argument.
3. **Callbacks with state** — event handlers or `setTimeout` that need to remember something from their creation context.
4. **Memoization** — a returned function that checks and updates a closed-over cache object.

The classic gotcha: closures capture *variables*, not *values*. A `var` in a loop shares one binding across iterations. Fix with `let` (block-scoped) or an IIFE that creates a fresh scope per iteration.
