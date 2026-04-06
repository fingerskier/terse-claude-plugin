Here's a basic Express.js server with logging, error handling, and CORS:

```js
const express = require('express');
const cors = require('cors');

const app = express();

// --- Middleware ---

// CORS
app.use(cors());
// For specific origins:
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Body parsing
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// --- Routes ---

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

// --- Error handling (must be last) ---

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler (4 params required)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

// --- Start ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

Install dependencies:

```bash
npm install express cors
```

Key points:

- **Middleware order matters** — CORS and body parsing go first, error handlers go last
- **Error handler needs 4 parameters** (`err, req, res, next`) — Express uses the arity to identify it as an error handler
- **`next(err)`** from any route/middleware skips to the error handler
- For production logging, consider `morgan` (HTTP logging) or `pino` (structured JSON logging) instead of the manual middleware
