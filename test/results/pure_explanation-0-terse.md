## JS Event Loop

**Call stack** — single-threaded execution. Functions push/pop LIFO. Blocks until empty.

**Task queue** (macrotask) — `setTimeout`, `setInterval`, I/O, UI events. One task per loop tick after stack empties.

**Microtask queue** — `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`. **Drains entirely** between each macrotask — microtasks always beat next macrotask.

**Loop cycle:** call stack empties → drain all microtasks → one macrotask → repeat.

### Key interactions

- `setTimeout(fn, 0)` — macrotask queue. Runs after all microtasks.
- `Promise.resolve().then(fn)` — microtask. Runs before any pending setTimeout.
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

**Why:** sync code runs first (1, 5, 7). Stack empties → microtasks drain in order (3, 6, 4). Then macrotask (2). Note `await` splits function — everything before runs sync, everything after queues as microtask.
