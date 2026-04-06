CSS Grid is a 2D layout system. Here's the core mental model:

**Container** (the parent) defines the grid structure. **Items** (children) place themselves in it.

### Basics

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr; /* 3 columns */
  grid-template-rows: auto 1fr auto;    /* 3 rows */
  gap: 16px;                            /* spacing between cells */
}
```

- `fr` = fractional unit. `1fr 2fr` means the second column gets twice the space of the first.
- `auto` = sized to content.
- `gap` = gutters between rows/columns.

### Placing items

By default, items flow into cells left-to-right, top-to-bottom. You can explicitly place them:

```css
.item {
  grid-column: 1 / 3;  /* span from line 1 to line 3 (2 columns) */
  grid-row: 2 / 4;     /* span from line 2 to line 4 (2 rows) */
}
```

Grid lines are numbered starting at 1, not 0.

### Named areas (the easiest approach for page layouts)

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

This is the most readable way to build layouts — you can literally see the structure.

### Useful shortcuts

| Pattern | What it does |
|---|---|
| `repeat(3, 1fr)` | Same as `1fr 1fr 1fr` |
| `repeat(auto-fill, minmax(200px, 1fr))` | Responsive grid — fills as many 200px+ columns as fit |
| `place-items: center` | Centers all items in their cells |
| `grid-column: span 2` | Item spans 2 columns from wherever it lands |

### Grid vs Flexbox

- **Flexbox** = 1D (row *or* column)
- **Grid** = 2D (rows *and* columns simultaneously)

Use Flexbox for components (navbars, card contents). Use Grid for page layouts and anything where you need alignment in both dimensions.

### Where people get stuck

1. **Forgetting `display: grid`** — nothing works without it on the container
2. **Confusing lines vs tracks** — 3 columns create 4 lines (1, 2, 3, 4)
3. **Implicit grid** — items that overflow the defined grid create new rows automatically, controlled by `grid-auto-rows`
4. **`minmax()`** — use it for responsive grids instead of media queries: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`

What specifically have you been struggling with? I can dig into any of these areas.
