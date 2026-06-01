# ADR-001: SvelteKit con Svelte 5 Runes

## Status
Accepted

## Context
Svelte 5 introduces a new reactivity model based on runes (`$state`, `$derived`, `$effect`). The traditional store-based approach (`writable`, `readable`, `derived` from `svelte/store`) remains available but is considered legacy in Svelte 5 projects.

## Decision
All new components and modules will use Svelte 5 runes for reactivity. Traditional Svelte stores are prohibited unless integrating with a third-party library that requires them.

- Use `$state` instead of `writable`
- Use `$derived` instead of `derived`
- Use `$effect` instead of `onMount`/`afterUpdate` where appropriate
- Use `$props` for component props

## Consequences
- Code is more readable and colocated
- Reactivity is explicit and predictable
- Developers unfamiliar with Svelte 5 runes will need to review the official docs before contributing