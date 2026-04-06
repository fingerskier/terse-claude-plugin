

`==` (loose equality) coerces types before comparing. `===` (strict equality) requires same type and value.

**`===` (strict)**
No conversion. Different types → `false`.
```js
1 === '1'    // false
0 === false  // false
null === undefined // false
```

**`==` (loose) coercion rules:**
1. `null == undefined` → `true` (and neither equals anything else)
2. Number vs String → string converted to number: `1 == '1'` → `true`
3. Boolean vs anything → boolean converted to number first: `true == '1'` → `1 == '1'` → `true`
4. Object vs primitive → object's `valueOf()`/`toString()` called

**Common gotchas:**
```js
'' == false     // true (both become 0)
[] == false     // true ([] → '' → 0, false → 0)
[] == ![]       // true (![] is false, then [] == false)
null == 0       // false (null only == undefined)
NaN == NaN      // false (both == and ===)
```

**Rule of thumb:** Always use `===` unless you specifically want `null == undefined` coalescing.
