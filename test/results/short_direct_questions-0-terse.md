

`var`: function-scoped, hoisted, redeclarable. Leaks out of `if`/`for` blocks.

`let`: block-scoped, not redeclarable. Hoisted but in TDZ (temporal dead zone) until declaration.

`const`: same as `let` but no reassignment. Object/array contents still mutable.

Default to `const`. Use `let` when rebinding needed. Avoid `var`.
