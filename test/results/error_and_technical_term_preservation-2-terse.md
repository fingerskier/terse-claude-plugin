

`==` (loose) coerces types before comparing. `===` (strict) no coercion — type + value must match.

**Coercion rules for `==`:**
- `null == undefined` → true (only equal to each other)
- Number vs String → string converts to number
- Boolean vs anything → boolean converts to number first (true→1, false→0), then compare
- Object vs primitive → object calls `valueOf()`/`toString()`

**Key gotchas:**
- `"0" == false` → true (both become 0)
- `"" == false` → true (both become 0)
- `[] == false` → true ([] → "" → 0)
- `null == false` → **false** (null only == undefined)
- `NaN == NaN` → false (both == and ===)

**Rule of thumb:** Always use `===`. Only use `==` intentionally for `x == null` (catches both null and undefined).
