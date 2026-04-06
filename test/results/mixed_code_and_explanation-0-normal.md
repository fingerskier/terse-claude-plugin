Here's a basic Express.js server with logging, error handling, and CORS:

```js
const express = require('express');
const cors = require('cors');

const app = express();

// CORS middleware
app.use(cors());

// Body parsing
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler (must have 4 params)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

**Setup:**
```bash
npm init -y
npm install express cors
```

**Key points:**
- Middleware runs in order — put logging before routes, error handler last
- The error handler **must** have all 4 parameters `(err, req, res, next)` — Express uses the arity to distinguish it from regular middleware
- `cors()` with no args allows all origins; pass options like `cors({ origin: 'http://localhost:5173' })` to restrict
- For production logging, consider `morgan` instead of the manual logger

Want me to expand on any part — like custom CORS config, structured logging, or async error handling?
