A few common ways:

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

**Margin auto (horizontal only):**
```css
.child {
  width: 200px;
  margin: 0 auto;
}
```

Flexbox or grid are the go-to choices for most cases.
