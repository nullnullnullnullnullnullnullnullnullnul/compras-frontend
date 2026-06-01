# ADR-007: Conventional Commits

## Status
Accepted

## Context
Inconsistent commit messages make changelogs, release notes, and git history navigation difficult.

## Decision
All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification, enforced automatically via commitlint + husky on every commit.

Valid types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`, `ci`

Examples:
- `feat: add price comparison screen`
- `fix: correct cart total calculation`
- `chore: update dependencies`
- `docs: add ADR-007`

Non-conventional commits are rejected by the pre-commit hook.

## Consequences
- Clean, parseable git history
- Automatic changelog generation is possible
- Developers must learn the convention before their first commit