# Without terse
  claude -p "Explain how JavaScript's event loop works, including the call stack, task queue, microtask queue, and how setTimeout, Promises, and async/await interact with each. Include a code example that demonstrates the execution order." > normal.md

# With terse
  claude -p "/terse:terse Explain how JavaScript's event loop works, including the call stack, task queue, microtask queue, and how setTimeout, Promises, and async/await interact with each. Include a code example that demonstrates the execution order." > terse.md

# Compare
  `wc -w normal.md terse.md`