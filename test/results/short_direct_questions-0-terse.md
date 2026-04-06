

`var`: function-scoped, hoisted (initialized `undefined`), redeclarable. Leaks out of `if`/`for` blocks.

`let`: block-scoped, hoisted but uninitialized (TDZ — temporal dead zone throws if accessed before declaration). Reassignable, not redeclarable in same scope.

`const`: same as `let` but no reassignment. Object/array contents still mutable — only binding is constant.

**Default choice:** `const` > `let` > never `var`.
