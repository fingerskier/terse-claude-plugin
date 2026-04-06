

`==` (loose equality) coerces types before comparing. `===` (strict equality) requires same type and value.

**`===` (strict)**
No conversion. Different types → `false`.
```js
1 === '1'    // false
null === undefined // false
```

**`==` (loose) coercion rules:**
- `null == undefined` → `true` (and nothing else equals either)
- String vs Number → string converted to number: `'5' == 5` → `true`
- Boolean vs anything → boolean converted to number first: `true == '1'` → `1 == '1'` → `1 == 1` → `true`
- Object vs primitive → object converted via `valueOf()`/`toString()`: `[1] == 1` → `'1' == 1` → `true`

**Common gotchas:**
```js
'' == 0        // true ('' → 0)
'0' == false   // true (false → 0, '0' → 0)
'' == false     // true (both → 0)
[] == false     // true ([] → '' → 0, false → 0)
[] == ![]       // true (![] is false, then same as above)
```

**Rule of thumb:** Use `===` by default. Use `==` only for `x == null` (catches both `null` and `undefined`).
