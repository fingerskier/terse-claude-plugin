This is a test prompt from `prompts.json` — there's no actual rate limiting code in this repo. The project is a Claude Code plugin for terse communication mode.

I'll write a sample PR description as the test prompt intends:

---

## Add Rate Limiting Middleware to API Gateway

### Summary
- Add configurable rate limiting middleware to protect API endpoints from abuse and ensure fair resource allocation
- Implement token bucket algorithm with per-client tracking using sliding window counters
- Support both IP-based and API-key-based rate limiting with configurable thresholds

### Changes
- **`src/middleware/rate-limiter.ts`** — Core middleware implementing token bucket with Redis-backed counters
- **`src/config/rate-limits.ts`** — Per-route rate limit configuration (defaults: 100 req/min standard, 1000 req/min authenticated)
- **`src/middleware/index.ts`** — Register rate limiter in middleware chain before auth
- **`src/utils/sliding-window.ts`** — Sliding window counter implementation for accurate rate tracking across time boundaries
- **`tests/middleware/rate-limiter.test.ts`** — Unit and integration tests covering limit enforcement, header responses, and edge cases

### Behavior
- Returns `429 Too Many Requests` with `Retry-After` header when limit exceeded
- Adds `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` headers to all responses
- Graceful degradation: if Redis unavailable, falls back to in-memory store with warning log
- Configurable bypass for health check and internal service endpoints

### Test Plan
- [ ] Verify rate limit headers present on normal responses
- [ ] Confirm 429 returned when limit exceeded, with correct `Retry-After` value
- [ ] Test sliding window accuracy across minute boundaries
- [ ] Validate Redis failover to in-memory fallback
- [ ] Load test: sustained traffic at 2x limit confirms throttling without crashes
- [ ] Verify bypass routes (healthcheck, internal) are not rate-limited
