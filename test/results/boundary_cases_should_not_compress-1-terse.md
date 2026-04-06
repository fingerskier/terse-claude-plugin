This repo is the terse-claude-plugin itself — no API gateway or rate limiting code here. The task is to **write** a PR description (as a writing exercise), not describe actual changes in this repo.

Here's a PR description for adding rate limiting middleware to an API gateway:

---

## Add rate limiting middleware to the API gateway

### Summary

- Introduces a configurable rate limiting middleware that enforces per-client request quotas at the API gateway layer
- Supports sliding window and token bucket algorithms, selectable per route
- Integrates with Redis for distributed rate limit state across gateway instances

### Motivation

Unthrottled traffic has caused cascading failures in downstream services during traffic spikes. Rate limiting at the gateway provides a single enforcement point before requests reach backend services, improving system resilience and protecting shared resources.

### Changes

- **`src/middleware/rate-limiter.ts`** — Core middleware implementing sliding window counter and token bucket algorithms
- **`src/config/rate-limit.ts`** — Per-route rate limit configuration schema and defaults
- **`src/store/redis-rate-store.ts`** — Redis-backed distributed counter with atomic increment and TTL-based expiry
- **`src/middleware/index.ts`** — Registers rate limiter in the middleware pipeline, positioned after authentication and before routing
- **`tests/middleware/rate-limiter.test.ts`** — Unit tests covering limit enforcement, window rollover, burst handling, and multi-client isolation
- **`tests/integration/rate-limit.test.ts`** — Integration tests against a local Redis instance validating distributed state consistency

### Configuration

Rate limits are defined per route in `config/rate-limit.yaml`:

```yaml
routes:
  /api/v1/users:
    algorithm: sliding_window
    max_requests: 100
    window_seconds: 60
  /api/v1/search:
    algorithm: token_bucket
    bucket_size: 50
    refill_rate: 10  # tokens per second
```

### Behavior

- Clients identified by API key (authenticated) or IP address (unauthenticated)
- Returns `429 Too Many Requests` with `Retry-After` header when limit exceeded
- Rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`) included on all responses
- Graceful degradation: if Redis is unreachable, falls back to in-memory per-instance limiting with a warning log

### Test plan

- [ ] Unit tests pass: `npm run test:unit -- --grep "rate-limiter"`
- [ ] Integration tests pass with local Redis: `npm run test:integration -- --grep "rate-limit"`
- [ ] Load test confirms 429s returned at correct thresholds
- [ ] Verify `Retry-After` header accuracy across sliding window boundary
- [ ] Confirm Redis failover falls back to in-memory without dropping requests
- [ ] Validate no latency regression on unthrottled routes (p99 < 5ms overhead)

---

This is a general-purpose template. If you have an actual codebase with rate limiting changes, I can tailor it to the real diff.
