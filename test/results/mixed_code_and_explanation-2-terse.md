

`useReducer(reducer, initialState)` — returns `[state, dispatch]`.

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'reset': return { count: 0 }
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 })
dispatch({ type: 'increment' })
```

**Pick useReducer over useState when:**
- State has multiple sub-values that change together
- Next state depends on previous state
- State transitions follow named actions (login/logout/error)
- Reducer logic is testable outside component

**Stick with useState when:**
- Single primitive value (bool, string, number)
- Independent state updates
- No complex transitions

Rule of thumb: if you're calling multiple `setState` calls together or have `setState(prev => ...)` chains, switch to `useReducer`. Reducer centralizes logic, dispatch is stable ref (no re-render issues in deps).
