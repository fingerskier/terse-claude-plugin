REST API = architectural style for web services over HTTP.

**Core ideas:**
- Resources identified by URLs (`/users/42`)
- HTTP verbs = actions: `GET` read, `POST` create, `PUT` replace, `PATCH` update, `DELETE` remove
- Stateless — each request carries all needed context (no server-side session)
- Returns data (usually JSON), not pages

**Example flow:**
```
GET    /api/users      → list users
GET    /api/users/42   → get user 42
POST   /api/users      → create user (body = JSON)
PUT    /api/users/42   → replace user 42
DELETE /api/users/42   → delete user 42
```

**Key properties:** stateless, cacheable, uniform interface, client-server separation.

Contrast: GraphQL = single endpoint + query language. REST = many endpoints + HTTP verbs. REST simpler for CRUD, GraphQL better for complex/nested data fetching.
