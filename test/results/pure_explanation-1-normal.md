

Authentication verifies **who you are**; authorization determines **what you're allowed to do**.

## Authentication (AuthN)

Proves identity. Common patterns:

- **Session-based**: Server stores session after login; browser sends session cookie on each request.
- **Token-based (JWT)**: Server issues a signed token at login; client sends it in `Authorization: Bearer <token>` header. Stateless on the server side.
- **OAuth 2.0 / OpenID Connect**: Delegate authentication to a provider (Google, GitHub). The app receives an ID token or access token after the user consents.
- **Passkeys / WebAuthn**: Cryptographic key pair stored on device; no passwords transmitted.
- **MFA**: Layer a second factor (TOTP, SMS, hardware key) on top of any of the above.

## Authorization (AuthZ)

Controls access after identity is established. Common patterns:

- **Role-Based Access Control (RBAC)**: Users get roles (`admin`, `editor`, `viewer`); permissions are tied to roles.
- **Attribute-Based Access Control (ABAC)**: Decisions based on attributes of user, resource, and context (e.g., "user.department == resource.department AND time < 17:00").
- **Permission-based**: Fine-grained flags (`can_delete_posts`, `can_invite_users`) checked per action.
- **OAuth scopes**: Token carries scopes (`read:repos`, `write:issues`) that limit what API calls it can make.
- **Policy engines**: Centralized rules (e.g., OPA/Rego, Cedar) evaluated at enforcement points.

## How they connect

```
Request → AuthN middleware (verify identity)
        → AuthZ middleware (check permissions)
        → Handler (do the work)
```

AuthN always comes first — you can't check what someone is allowed to do if you don't know who they are.
