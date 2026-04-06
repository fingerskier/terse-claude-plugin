## Authentication vs Authorization

**Authentication** = "who are you?" — verifying identity.
**Authorization** = "what can you do?" — verifying permissions.

AuthN happens first, authZ depends on it.

## Authentication Patterns

- **Session-based**: login → server stores session → cookie with session ID → server looks up on each request
- **Token-based (JWT)**: login → server returns signed token → client sends in `Authorization: Bearer <token>` → server verifies signature, no server-side state
- **OAuth 2.0 / OIDC**: delegate authN to provider (Google, GitHub). Authorization code flow most common for web apps. OIDC adds identity layer (ID token) on top of OAuth
- **Passkeys/WebAuthn**: public-key crypto, phishing-resistant. Browser holds private key, server holds public key
- **MFA**: layer on top — TOTP (authenticator apps), SMS, hardware keys (FIDO2)

## Authorization Patterns

- **RBAC** (role-based): user → role → permissions. Simple, widely used. `admin`, `editor`, `viewer`
- **ABAC** (attribute-based): policies evaluate attributes (user dept, resource owner, time of day). More granular, more complex
- **ACL** (access control list): per-resource list of who can do what. Fine-grained but doesn't scale well
- **Policy-based**: centralized policy engine (OPA, Cedar, Casbin). Rules like `allow if user.org == resource.org && user.role in ["admin","editor"]`
- **Scope-based**: common in APIs/OAuth. Token carries scopes (`read:users`, `write:posts`), server checks scope per endpoint

## Key Distinction in Practice

| | AuthN | AuthZ |
|---|---|---|
| Question | Who? | What access? |
| Fails with | 401 Unauthorized | 403 Forbidden |
| Middleware | Runs first | Runs after identity known |
| State | Identity/session | Permissions/policies |

Common mistake: 401 is actually authN failure despite name "Unauthorized". 403 = authZ failure.
