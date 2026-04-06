REST API = architectural style for web services over HTTP.

Core constraints:
- **Stateless** — each request carries all context needed; server stores no session
- **Resource-based** — URLs represent nouns (`/users/42`), not actions
- **HTTP verbs as actions** — GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)
- **Representations** — resources returned as JSON/XML, not raw DB rows

Example: `GET /api/users/42` → returns user 42's data. `DELETE /api/users/42` → removes them.

Key properties: cacheable, layered (proxies/LBs transparent), uniform interface. Contrast w/ RPC where URLs are verbs (`/getUser`, `/deleteUser`).

Not a protocol — a set of conventions on top of HTTP.
