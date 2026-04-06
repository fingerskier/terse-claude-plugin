## Authentication vs Authorization

**Authentication** = "Who are you?" — verifying identity.
**Authorization** = "What can you do?" — enforcing permissions.

---

### Authentication Patterns

**Session-based**: User submits credentials, server creates a session (stored in DB/Redis), returns a session cookie. Each request sends the cookie; server looks up the session. Simple, but requires server-side state.

**Token-based (JWT)**: Server issues a signed JWT after login. Client stores it (usually `localStorage` or a cookie) and sends it via `Authorization: Bearer <token>`. Server validates the signature without a DB lookup. Stateless, but tokens can't be revoked easily without a blocklist.

**OAuth 2.0 / OpenID Connect**: Delegates authentication to an identity provider (Google, GitHub, etc.). The app receives an authorization code, exchanges it for tokens. Used for "Sign in with X" flows.

**Passkeys / WebAuthn**: Cryptographic key pair stored on the user's device. No passwords to steal or phish. Growing adoption.

**Multi-factor (MFA)**: Combines something you know (password) with something you have (TOTP code, hardware key) or something you are (biometrics).

---

### Authorization Patterns

**Role-Based Access Control (RBAC)**: Users are assigned roles (`admin`, `editor`, `viewer`). Permissions are attached to roles. Simple and widely used.

**Attribute-Based Access Control (ABAC)**: Decisions based on attributes of the user, resource, and environment (e.g., "managers can approve expenses under $10k in their own department"). More flexible, more complex.

**Permission-based**: Fine-grained flags like `posts:write`, `users:delete` assigned directly to users or roles. Common in APIs.

**Policy engines**: Externalized authorization logic (e.g., Open Policy Agent, Cedar). Policies are decoupled from application code. Good for complex or cross-service rules.

**Scope-based (OAuth)**: Access tokens carry scopes (`read:email`, `repo`) that limit what the token holder can do, regardless of the user's full permissions.

---

### Key Principle

Keep them separate. Authenticate once at the edge (middleware), then pass the verified identity into authorization checks deeper in the stack. Mixing them together leads to fragile, hard-to-audit security logic.
