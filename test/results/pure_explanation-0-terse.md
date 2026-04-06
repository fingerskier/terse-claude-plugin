## JS Event Loop

**Call stack** — single-threaded execution. Functions push/pop LIFO. Blocks until empty.

**Task queue** (macrotasks) — `setTimeout`, `setInterval`, I/O, UI rendering. One task per loop iteration.

**Microtask queue** — `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`. Drains entirely after each task, before next task or render.

**Loop cycle:** call stack empties → drain all microtasks → one macrotask → repeat.

### Key interactions

- `setTimeout(fn, 0)` — macrotask. Runs after current script + all microtasks.
- `Promise.resolve().then(fn)` — microtask. Runs before any macrotask.
- `async/await` — sugar over promises. Code after `await` = `.then()` callback = microtask.

### Execution order demo

```js
console.log('1: sync')

setTimeout(() => console.log('2: timeout'), 0)

Promise.resolve()
  .then(() => console.log('3: microtask 1'))
  .then(() => console.log('4: microtask 2'))

async function run() {
  console.log('5: async sync part')
  await Promise.resolve()
  console.log('6: after await (microtask)')
}
run()

console.log('7: sync end')
```

**Output:**
```
1: sync
5: async sync part
7: sync end
3: microtask 1
6: after await (microtask)
4: microtask 2
2: timeout
```

**Why:** 1, 5, 7 are synchronous (call stack). Then microtask queue drains: 3, 6 (both queued microtasks), then 4 (chained from 3). Finally macrotask: 2.

Note: 6 and 3 are same-priority microtasks — order depends on scheduling. `await` resumes after already-queued `.then`s at same depth.
