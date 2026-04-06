

`==` coerces types before comparing. `===` compares value AND type, no coercion.

**`===` (strict equality)**
Same type + same value → `true`. Different types → always `false`.

**`==` (loose equality)** — coercion rules:
- `null == undefined` → `true` (and nothing else equals either)
- String vs Number → string converts to number. `"5" == 5` → `true`
- Boolean vs anything → boolean converts to number first (`true`→1, `false`→0), then compare again
- Object vs primitive → object calls `valueOf()` then `toString()`

**Common gotchas:**
```
"" == false    // true (both coerce to 0)
"0" == false   // true (both coerce to 0)
"" == "0"      // false (both strings, different values)
[] == false    // true ([].toString() → "" → 0)
[] == ![]      // true (![] → false → 0, [] → "" → 0)
```

**Rule:** Default to `===`. Use `== null` only when you intentionally want to catch both `null` and `undefined`.
