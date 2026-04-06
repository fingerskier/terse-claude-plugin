

`let` — block-scoped, reassignable, not hoisted as initialized.

`const` — block-scoped, not reassignable (but objects/arrays are still mutable), not hoisted as initialized.

`var` — function-scoped (or global), reassignable, hoisted and initialized as `undefined`.

Key practical rule: default to `const`, use `let` when you need reassignment, avoid `var`.
