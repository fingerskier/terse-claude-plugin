`npm install express cors morgan`

```js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());                    // CORS - all origins by default
app.use(morgan('dev'));             // Logging - method, url, status, time
app.use(express.json());           // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler - must be last, must have 4 params
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => console.log('Listening on :3000'));
```

Key points:
- **Order matters**: CORS/logging before routes, error handler after
- **CORS**: restrict origins via `cors({ origin: 'https://yourdomain.com' })`
- **morgan formats**: `'dev'` (colored status), `'combined'` (Apache-style), `'tiny'` (minimal)
- **Error handler**: Express identifies it by 4-param signature — skip `next` param and it won't work
- **Async errors** (Express <5): wrap in `try/catch`, call `next(err)`. Express 5+ auto-catches async
