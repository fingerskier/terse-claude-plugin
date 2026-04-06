## Debounce in TypeScript

```typescript
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
```

## Debounce vs Throttle

**Debounce** — waits until activity *stops*, then fires once.
- Search input: fire after user stops typing
- Window resize: recalc layout after resize ends
- Auto-save: save after edits pause

**Throttle** — fires at most once per interval, *during* activity.
- Scroll handler: update position max 1x/100ms
- Rate-limited API calls: cap request frequency
- Drag events: sample position at fixed rate

**Mental model:** Debounce = "wait for calm." Throttle = "sample at interval."

| | Fires during activity | Fires after stop |
|---|---|---|
| **Debounce** | No | Yes (once) |
| **Throttle** | Yes (periodic) | Maybe (trailing) |

Throttle variant for reference:

```typescript
function throttle<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}
```

Pick debounce when final value matters. Pick throttle when periodic updates matter.
