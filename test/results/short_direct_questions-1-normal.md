Several ways, depending on context:

**Flexbox (most common):**
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Grid:**
```css
.parent {
  display: grid;
  place-items: center;
}
```

**Absolute positioning:**
```css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Horizontal only:**
```css
.child {
  margin: 0 auto;
}
```

Flexbox or grid with `place-items: center` are the go-to choices for most cases.
