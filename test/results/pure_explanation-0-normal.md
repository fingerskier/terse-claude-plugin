## JavaScript Event Loop

The event loop is the mechanism that allows JavaScript to be non-blocking despite being single-threaded. It continuously checks whether the call stack is empty, and if so, pulls work from the queues.

### Core Components

**Call Stack** — Where synchronous code executes. Functions push frames on; returns pop them off. Only one thing runs at a time.

**Task Queue (Macrotask Queue)** — Holds callbacks from `setTimeout`, `setInterval`, I/O, and DOM events. The event loop picks **one** task per iteration after the stack is empty.

**Microtask Queue** — Holds `.then()`/`.catch()`/`.finally()` callbacks and `queueMicrotask()` calls. **Drained completely** (all microtasks) after each macrotask, before the next macrotask runs. This gives microtasks higher priority.

### How the APIs map to queues

| API | Queue |
|-----|-------|
| `setTimeout` / `setInterval` | Task (macro) |
| `Promise.then/catch/finally` | Microtask |
| `await` | Resumes via microtask (equivalent to `.then()`) |
| `queueMicrotask()` | Microtask |

**`async/await` desugaring**: Code after `await` is essentially wrapped in a `.then()` callback, so it resumes as a microtask.

### Execution order example

```js
console.log('1: sync start');

setTimeout(() => {
  console.log('6: setTimeout callback (macrotask)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3: promise .then (microtask 1)');
  })
  .then(() => {
    console.log('5: chained .then (microtask 2)');
  });

async function demo() {
  console.log('2: inside async fn (sync part)');
  await Promise.resolve();
  console.log('4: after await (microtask)');
}

demo();

console.log('2.5: sync end');
```

**Output:**
```
1: sync start
2: inside async fn (sync part)
2.5: sync end
3: promise .then (microtask 1)
4: after await (microtask)
5: chained .then (microtask 2)
6: setTimeout callback (macrotask)
```

### Why this order?

1. **`1`, `2`, `2.5`** — All synchronous. `demo()` runs synchronously up to the `await`, then yields. The rest of the top-level script continues.
2. **`3`, `4`** — The stack is now empty, so the microtask queue drains. The `.then()` callback and the `await` resumption are both microtasks queued during the sync phase.
3. **`5`** — The chained `.then()` was queued by microtask `3`, and microtasks queued *during* microtask processing are also drained before moving on.
4. **`6`** — Only after all microtasks are exhausted does the event loop pick the next macrotask (`setTimeout`).

### The loop, visualized

```
┌─────────────────────────────┐
│        Call Stack            │  ← runs until empty
└─────────────┬───────────────┘
              │ empty?
              ▼
┌─────────────────────────────┐
│    Drain ALL Microtasks     │  ← Promise.then, await resume
└─────────────┬───────────────┘
              │ empty?
              ▼
┌─────────────────────────────┐
│   Pick ONE Macrotask        │  ← setTimeout, I/O
└─────────────┬───────────────┘
              │
              └──→ back to top
```

This cycle repeats indefinitely. The key insight: **microtasks always jump the line ahead of the next macrotask**, which is why Promise callbacks run before `setTimeout(..., 0)` even though both are "asynchronous."
