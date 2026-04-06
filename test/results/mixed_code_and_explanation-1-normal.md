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

**Usage:**
```typescript
const handleSearch = debounce((query: string) => {
  fetchResults(query);
}, 300);

input.addEventListener("input", (e) => handleSearch(e.target.value));
```

## Debounce vs Throttle

| | Debounce | Throttle |
|---|---|---|
| **Fires** | Once, after activity *stops* | At most once per interval, *during* activity |
| **Mental model** | "Wait until they're done" | "Sample at a steady rate" |

**Use debounce for:**
- Search-as-you-type (wait for user to stop typing)
- Window resize calculations (wait for resize to finish)
- Auto-save (wait for editing pause)

**Use throttle for:**
- Scroll handlers (update position at steady intervals)
- Mouse move / drag (sample coordinates regularly)
- Rate-limited API calls (enforce max frequency)

**Key difference:** If a user types for 5 seconds with a 300ms debounce, it fires **once** at the end. A 300ms throttle fires **~16 times** throughout.
