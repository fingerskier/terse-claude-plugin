Here's a PR description for adding rate limiting middleware to the API gateway:

---

## Add rate limiting middleware to API gateway

### Summary
- Introduce configurable rate limiting middleware to protect API endpoints from abuse and ensure fair resource allocation
- Support multiple rate limiting strategies (fixed window, sliding window, token bucket)
- Add per-route and per-client configuration with sensible defaults

### Motivation
Without rate limiting, the API gateway is vulnerable to traffic spikes — whether from misbehaving clients, retry storms, or deliberate abuse. This middleware provides a defense layer that protects downstream services from overload.

### Changes
- Add `RateLimiter` middleware with pluggable strategy interface
- Implement fixed window, sliding window, and token bucket algorithms
- Add Redis-backed distributed counter for multi-instance deployments
- Expose `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` response headers
- Return `429 Too Many Requests` with `Retry-After` header when limits are exceeded
- Add per-route configuration via gateway config file
- Add client identification via API key, IP address, or custom header

### Configuration example
```yaml
rateLimit:
  default:
    requests: 100
    window: 60s
  routes:
    /api/search:
      requests: 20
      window: 60s
    /api/bulk:
      requests: 5
      window: 60s
```

### Test plan
- [ ] Unit tests for each rate limiting algorithm
- [ ] Integration tests verifying 429 responses after limit exceeded
- [ ] Verify correct rate limit headers on all responses
- [ ] Test distributed counting across multiple gateway instances
- [ ] Load test to confirm middleware adds < 2ms p99 latency overhead
- [ ] Verify bypass for health check and internal endpoints

---

Want me to adjust the scope, tone, or detail level?
