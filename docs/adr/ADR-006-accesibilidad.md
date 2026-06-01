# ADR-006: Accesibilidad WCAG 2.1 AA

## Status
Accepted

## Context
La Góndola targets a broad user base including older adults. Accessibility is not optional.

## Decision
WCAG 2.1 AA compliance is a definition-of-done criterion for every UI task. A card is not considered done until it meets the following:

- Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- All interactive elements are keyboard accessible
- All images have descriptive `alt` attributes
- All form inputs have associated `<label>` elements
- Focus indicators are visible
- Touch targets are at least 44×44px

Automated checks via `eslint-plugin-jsx-a11y` catch common issues at lint time. Manual review is required for interactive components.

## Consequences
- Slightly more development time per component
- Significantly broader usable audience
- Reduced legal and reputational risk