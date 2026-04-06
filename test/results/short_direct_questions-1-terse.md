Flexbox (most common):

```css
display: flex; justify-content: center; align-items: center;
```

Grid (shortest):

```css
display: grid; place-items: center;
```

Absolute positioning (within positioned parent):

```css
position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
```

Flex or grid on parent = centers children. Pick grid for single child, flex for multiple.
