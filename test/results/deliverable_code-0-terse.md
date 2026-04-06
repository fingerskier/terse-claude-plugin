File write denied. Here's the middleware:

```js
import jwt from 'jsonwebtoken';

export function createJwtMiddleware(options) {
  const {
    secret,
    algorithms = ['HS256'],
    audience,
    issuer,
    skip = [],
  } = options;

  if (!secret) {
    throw new Error('JWT middleware requires a secret or public key');
  }

  return function jwtMiddleware(req, res, next) {
    if (skip.includes(req.path)) return next();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'unauthorized',
        message: 'Missing Authorization header',
      });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        error: 'unauthorized',
        message: 'Authorization header must use Bearer scheme',
      });
    }

    const verifyOptions = { algorithms };
    if (audience) verifyOptions.audience = audience;
    if (issuer) verifyOptions.issuer = issuer;

    try {
      req.user = jwt.verify(parts[1], secret, verifyOptions);
      return next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          error: 'token_expired',
          message: 'Token has expired',
          expiredAt: err.expiredAt,
        });
      }
      if (err instanceof jwt.NotBeforeError) {
        return res.status(401).json({
          error: 'token_not_active',
          message: 'Token is not yet valid',
          notBefore: err.date,
        });
      }
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          error: 'invalid_token',
          message: 'Token is malformed or signature is invalid',
        });
      }
      return res.status(500).json({
        error: 'internal_error',
        message: 'Failed to authenticate token',
      });
    }
  };
}
```

**Usage:**

```js
app.use(createJwtMiddleware({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  skip: ['/health', '/login'],
}));
```

**Covers:** missing header → 401, bad scheme → 401, expired → 401 w/ `expiredAt`, not-yet-valid → 401, bad signature/malformed → 401, unexpected errors → 500. Decoded payload on `req.user`. Configurable algorithms, audience, issuer, skip paths.
