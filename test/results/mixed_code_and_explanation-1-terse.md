## Debounce in TypeScript

```typescript
function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}
```

## Debounce vs Throttle

| | Debounce | Throttle |
|---|---|---|
| Fires | After activity **stops** for `ms` | At most once per `ms` **during** activity |
| Pattern | Reset timer each call | Block calls until cooldown expires |
| Use | Search input, resize end, form validation | Scroll handler, mousemove, rate-limited API |

**Mental model:** Debounce = "wait til they're done." Throttle = "sample at interval."

Debounce for bursty input where only final value matters. Throttle when you need periodic updates during continuous activity.

Throttle for reference:

```typescript
function throttle<T extends (...args: any[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last >= ms) { last = now; fn(...args) }
  }
}
```
