# ADR-003: API Services Pattern

## Status
Accepted

## Context
Allowing `fetch` calls directly in components, `load` functions, or stores leads to duplicated logic, inconsistent error handling, and makes mocking for tests difficult.

## Decision
All HTTP communication goes through service modules located in `$lib/services/api/`. No component, `load` function, or store may call `fetch` directly.

Structure:

src/lib/services/api/
├── client.ts        # Base fetch wrapper with auth headers and error handling
├── productos.ts     # Product-related endpoints
├── listas.ts        # Cart/list-related endpoints
└── supermercados.ts # Supermarket-related endpoints

Components and load functions import and call service functions only.

## Consequences
- Consistent error handling and auth header injection in one place
- Easy to mock in unit tests
- Clear separation between UI and data fetching logic