# ADR-005: Auth con Cookies HttpOnly

## Status
Accepted

## Context
Storing JWTs in localStorage or in-memory JavaScript state exposes them to XSS attacks. The frontend having direct access to the JWT increases the attack surface.

## Decision
Authentication is handled exclusively via httpOnly cookies set by the backend. The frontend never reads, stores, or manipulates the JWT directly.

- Backend sets the httpOnly cookie on login
- Backend clears the cookie on logout
- Frontend sends credentials automatically via cookie on every request
- Frontend has no access to the raw token value

## Consequences
- JWT is not accessible via JavaScript, eliminating XSS token theft
- CSRF protection must be implemented (handled by the backend)
- Frontend auth state is derived from API responses, not from decoding the JWT