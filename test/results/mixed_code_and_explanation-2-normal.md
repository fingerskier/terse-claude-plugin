No worries — here's the answer from what I know.

## `useReducer` basics

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- **reducer** — a pure function `(state, action) => newState`
- **dispatch** — sends an action to the reducer

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
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

## When to pick `useReducer` over `useState`

| Pick `useReducer` when… | Stick with `useState` when… |
|---|---|
| State has multiple sub-values (e.g. form with many fields) | Single primitive or simple value |
| Next state depends on previous state in complex ways | Updates are straightforward assignments |
| Multiple actions can modify the same state | One or two ways to update |
| You want update logic testable outside the component | Logic is trivial |
| State transitions need to be explicit/documented | Quick prototyping |

**Rule of thumb:** if you find yourself writing multiple `useState` calls that change together, or your setter callbacks are getting complex, that's the signal to switch to `useReducer`.

## Lazy initialization (optional 3rd arg)

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
// init(initialArg) runs once to compute initial state — useful for expensive setup
```
