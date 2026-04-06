## CSS Grid

**Core concept:** 2D layout system. Rows + columns simultaneously (unlike flexbox = 1D).

**Container** — `display: grid` on parent:
- `grid-template-columns: 200px 1fr 1fr` → 3 cols, first fixed, rest split equally
- `grid-template-rows: auto 1fr` → row heights
- `gap: 16px` → gutters between cells
- `fr` = fractional unit. Divides remaining space proportionally

**Placing items:**
- Default: auto-flow, fills left→right, top→bottom
- Explicit: `grid-column: 1 / 3` → span cols 1-2
- Named: `grid-area: header` with `grid-template-areas` on parent

**Template areas** — most intuitive layout method:
```css
grid-template-areas:
  "header header header"
  "sidebar main main"
  "footer footer footer";
```
Then child gets `grid-area: sidebar`.

**Key patterns:**
- `repeat(3, 1fr)` = `1fr 1fr 1fr`
- `repeat(auto-fill, minmax(250px, 1fr))` → responsive columns, no media queries
- `minmax(min, max)` → flexible sizing with bounds
- `auto-fit` vs `auto-fill`: fit collapses empty tracks, fill keeps them

**Mental model:** Grid = spreadsheet. You define the grid structure on parent, then optionally tell children which cells to occupy. Unplaced children auto-fill next available cell.

**Common struggle points:**
1. `fr` only works on *remaining* space after fixed/content sizes
2. Items can overlap — use `grid-column`/`grid-row` to layer, `z-index` to control stack
3. `align-items`/`justify-items` = within cell. `align-content`/`justify-content` = grid within container
4. Implicit rows auto-created if more items than defined rows — control with `grid-auto-rows`

**Flexbox vs Grid:** Flex = content-out (content dictates size). Grid = layout-in (grid dictates size). Use both — grid for page layout, flex for component internals.
