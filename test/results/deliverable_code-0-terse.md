JWT auth middleware for Express:

```js
const jwt = require('jsonwebtoken');

function authenticateToken(secret, options = {}) {
  const { algorithms = ['HS256'], headerKey = 'authorization' } = options;

  return (req, res, next) => {
    const header = req.headers[headerKey];

    if (!header) {
      return res.status(401).json({ error: 'Missing authorization header' });
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Invalid authorization format. Expected: Bearer <token>' });
    }

    const token = parts[1];

    try {
      const decoded = jwt.verify(token, secret, { algorithms });
      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Token expired',
          expiredAt: err.expiredAt,
        });
      }
      if (err.name === 'NotBeforeError') {
        return res.status(401).json({ error: 'Token not yet active' });
      }
      // JsonWebTokenError covers malformed, bad signature, bad algorithm
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

module.exports = authenticateToken;
```

**Usage:**

```js
const auth = require('./authenticateToken');

app.use('/api', auth(process.env.JWT_SECRET));
app.get('/api/profile', (req, res) => res.json(req.user));
```

Key points:
- Factory pattern — secret injected, not hardcoded
- `Bearer` scheme enforced per RFC 6750
- Distinct error for expired vs invalid vs missing
- `req.user` set from decoded payload
- Algorithm whitelist prevents `alg: none` attack
- 401 for all auth failures (403 = authorized but forbidden, different concern)
