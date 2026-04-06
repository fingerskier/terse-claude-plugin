`npm i express cors morgan`

```js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());              // CORS headers
app.use(morgan('dev'));        // Request logging
app.use(express.json());      // Body parsing

// Routes
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Error handler — must be 4-arg
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => console.log('Listening on 3000'));
```

Key points:
- `morgan('dev')` — colored status logs. Use `'combined'` for production (Apache format)
- `cors()` no-arg = allow all origins. Restrict: `cors({ origin: 'https://yourdomain.com' })`
- Error middleware **must** have 4 params `(err, req, res, next)` — Express uses arity to detect it
- Order matters: CORS + logging before routes, error handler after routes
- Async errors need explicit `next(err)` or use `express-async-errors` pkg to auto-catch
