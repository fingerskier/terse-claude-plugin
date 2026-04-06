

`let`, `const`, and `var` differ in scope, reassignment, and hoisting:

| | Scope | Reassignable | Hoisted | TDZ |
|---|---|---|---|---|
| `var` | Function | Yes | Yes (as `undefined`) | No |
| `let` | Block | Yes | Yes (but inaccessible) | Yes |
| `const` | Block | No | Yes (but inaccessible) | Yes |

**`var`** — function-scoped, hoisted with `undefined`, can be redeclared. Leaks out of `if`/`for` blocks.

**`let`** — block-scoped, can be reassigned but not redeclared in the same scope. Temporal dead zone (TDZ) means accessing it before declaration throws a `ReferenceError`.

**`const`** — same as `let` but cannot be reassigned. Note: objects/arrays assigned to `const` are still mutable (you can push to a const array, add properties to a const object).

**Rule of thumb:** Default to `const`. Use `let` when you need reassignment. Avoid `var`.
