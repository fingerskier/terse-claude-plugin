CSS Grid is a 2D layout system. Here's the core mental model:

**Container (parent)** — gets `display: grid` and defines the structure:

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;  /* 3 columns */
  grid-template-rows: auto 1fr auto;      /* 3 rows */
  gap: 16px;                               /* space between cells */
}
```

**Items (children)** — placed into that structure automatically or explicitly:

```css
.sidebar { grid-column: 1; grid-row: 1 / 3; }   /* span 2 rows */
.header  { grid-column: 2 / 4; }                  /* span columns 2-3 */
```

**Key concepts:**

1. **`fr` unit** — "fraction of remaining space." `1fr 2fr` means the second column gets twice the space of the first.

2. **`grid-template-columns` / `rows`** — defines the track sizes. Mix units freely: `200px 1fr auto`.

3. **`gap`** — spacing between tracks (replaces margins between items).

4. **Placement** — items auto-fill left-to-right, top-to-bottom. Override with `grid-column` / `grid-row` using line numbers (1-based).

5. **`repeat()`** — shorthand: `repeat(3, 1fr)` = `1fr 1fr 1fr`.

6. **`minmax()`** — responsive tracks: `minmax(200px, 1fr)` = at least 200px, grows to fill.

7. **`auto-fill` / `auto-fit`** — responsive column count without media queries:
   ```css
   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   ```

**Common layout pattern (holy grail):**

```css
.page {
  display: grid;
  grid-template: "header header" auto
                 "sidebar main" 1fr
                 "footer footer" auto
                 / 250px 1fr;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

**Grid vs Flexbox:**
- **Flexbox** = 1D (row *or* column)
- **Grid** = 2D (rows *and* columns simultaneously)

Use Grid when you need alignment in both directions. Use Flexbox for single-axis flows like navbars or card rows.

What specifically are you struggling with? I can dig into any of these areas more.
