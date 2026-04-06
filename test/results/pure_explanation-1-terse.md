## Authentication vs Authorization

**Authentication** = "who are you?" Identity verification.
**Authorization** = "what can you do?" Permission enforcement.

Auth*n* happens first, auth*z* depends on it.

## Authentication Patterns

- **Session-based** — server stores session after login, sends cookie. Stateful. Simple. Scales with session store (Redis).
- **Token-based (JWT)** — server issues signed token, client sends in `Authorization: Bearer <token>`. Stateless. Watch token size + expiry.
- **OAuth 2.0 / OIDC** — delegated auth via provider (Google, GitHub). Authorization code flow for web apps. PKCE for SPAs.
- **Passkeys/WebAuthn** — public-key crypto, phishing-resistant. Browser + authenticator handle challenge-response.
- **MFA** — layer on top: TOTP, SMS, hardware key. Not standalone.

## Authorization Patterns

- **RBAC** (Role-Based) — user → role → permissions. Most common. `admin`, `editor`, `viewer`. Simple, coarse-grained.
- **ABAC** (Attribute-Based) — policies eval attributes (user dept, resource owner, time). Fine-grained. More complex.
- **ACL** — per-resource permission lists. `file X: user A=read, user B=write`. Good for file/document systems.
- **Policy engines** — externalized rules (OPA/Rego, Cedar, Casbin). Decouple authz logic from app code.
- **Scope-based** — OAuth scopes limit token permissions. `read:users`, `write:posts`. API-centric.

## Key Distinction in Practice

Auth*n* middleware runs early (verify token/session). Auth*z* middleware runs per-route or per-resource (check permissions against requested action). Mixing them = security bugs.
