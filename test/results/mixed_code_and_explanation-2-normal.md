No worries — here's the rundown from what I know.

## `useReducer` basics

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- **`reducer`** — a pure function `(state, action) => newState`
- **`initialState`** — the starting value
- **`dispatch`** — call this with an action to trigger a state update

### Minimal example

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

## When to pick `useReducer` over `useState`

| Pick `useReducer` when… | Stick with `useState` when… |
|---|---|
| State is an object/array with multiple sub-values | State is a single primitive (boolean, string, number) |
| Next state depends on previous state in complex ways | Updates are simple replacements |
| Multiple actions can modify the same state | One or two setters cover everything |
| You want update logic testable outside the component | Logic is trivial |
| You're passing `dispatch` down instead of multiple callbacks | Few or no child consumers |

### Rules of thumb

1. **If you find yourself writing 3+ related `useState` calls** that always update together, consolidate into `useReducer`.
2. **If your setter callbacks contain branching logic** (if/else on current state), move that logic into a reducer.
3. **`dispatch` is identity-stable** (never changes between renders), so passing it to deep children or context avoids unnecessary re-renders — unlike inline callbacks from `useState` setters.

### Lazy initialization (third argument)

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

`init(initialArg)` runs once to compute the initial state — useful when initialization is expensive (e.g., parsing props into a complex structure).
