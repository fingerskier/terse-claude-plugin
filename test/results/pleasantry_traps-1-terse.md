## CSS Grid — Core Mental Model

Grid = 2D layout. Rows + columns simultaneously. Flexbox = 1D.

### Container (parent)

```css
display: grid;
grid-template-columns: 200px 1fr 1fr;  /* 3 cols: fixed, flex, flex */
grid-template-rows: auto 1fr auto;      /* header, content, footer */
gap: 16px;                               /* gutter between cells */
```

`fr` = fraction of remaining space. `1fr 2fr` = 1/3 + 2/3.

### Placing items (children)

By default, items fill cells left→right, top→bottom. Override with:

```css
grid-column: 1 / 3;   /* span col lines 1 to 3 (2 cols wide) */
grid-row: 2 / 4;       /* span row lines 2 to 4 */
```

Lines are numbered from 1, not 0.

### Named areas (easiest layout method)

```css
/* container */
grid-template-areas:
  "header header header"
  "sidebar main main"
  "footer footer footer";

/* children */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
```

### Key shortcuts

| Want | Use |
|---|---|
| Equal columns | `grid-template-columns: repeat(3, 1fr)` |
| Auto-fill responsive | `repeat(auto-fill, minmax(200px, 1fr))` |
| Center single item | `place-items: center` |
| Span 2 cols | `grid-column: span 2` |

### Common gotchas

- `fr` distributes *remaining* space after fixed/minmax units
- `auto-fill` creates empty tracks; `auto-fit` collapses them (use `auto-fit` for responsive)
- Grid items stretch by default. `align-self`/`justify-self` to override
- Implicit rows (overflow items) sized by `grid-auto-rows`, not `grid-template-rows`

### Alignment

- `justify-*` = inline axis (horizontal by default)
- `align-*` = block axis (vertical)
- `place-*` = shorthand for both

Container: `justify-content`, `align-content` (whole grid in container)
Items: `justify-items`, `align-items` (items in cells)
Single item: `justify-self`, `align-self`

### Debug tip

Firefox DevTools > Inspector > click grid badge on element. Best grid visualizer available.

What specifically tripping you up? Layout structure, responsive patterns, alignment?
