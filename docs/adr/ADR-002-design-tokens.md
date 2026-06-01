# ADR-002: Design Tokens en CSS Variables

## Status
Accepted

## Context
Hardcoded color classes (e.g. `text-[#6DD944]`, `bg-gray-100`) scattered across components make visual consistency hard to maintain and theming impossible.

## Decision
All design values (colors, typography, spacing, radii, shadows) are defined as CSS custom properties in `src/app.css` under the `@theme` block and referenced via Tailwind utility classes generated from those variables. No hardcoded color values anywhere in component files.

- CORRECT: `bg-primary`, `text-text-muted`, `border-border`
- WRONG:   `bg-[#6DD944]`, `text-gray-500`, `border-gray-200`

## Consequences
- Single source of truth for all visual values
- Theming and future dark mode support is straightforward
- Developers must check `app.css` before introducing new visual values