## `useReducer`

```js
const [state, dispatch] = useReducer(reducer, initialState)
```

`reducer` = `(state, action) => newState`. Dispatch actions, reducer returns next state.

```js
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'set': return { count: action.payload }
    default: return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
dispatch({ type: 'increment' })
dispatch({ type: 'set', payload: 5 })
```

## When to pick over `useState`

**Use `useReducer` when:**
- State has multiple sub-values (object/array with related fields)
- Next state depends on previous state in complex ways
- Multiple actions modify same state differently
- State transitions have business logic worth centralizing

**Stick with `useState` when:**
- Single primitive value
- Simple set/toggle
- Independent state fields

## Rule of thumb

One `useState` = fine. Two related `useState` = fine. Three+ related `useState` where updates interleave = switch to `useReducer`. Keeps transitions explicit, testable (pure function), debuggable.

Bonus: pass `dispatch` down instead of multiple setter callbacks — stable ref, no re-render churn from prop changes.
