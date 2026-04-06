`data.results` is `undefined` when `.map()` runs. `data` exists but has no `results` property — likely API returned different shape, or response hasn't resolved yet.

Fix: `const items = (data?.results ?? []).map(r => r.name)`

Or guard earlier: check `data.results` before mapping.
