# ADR-004: Money en Centavos

## Status
Accepted

## Context
Floating point arithmetic on decimal currency values (e.g. `0.1 + 0.2 === 0.30000000000000004`) causes subtle bugs in price calculations.

## Decision
All monetary values are stored, passed, and processed as integers representing centavos (cents) throughout the internal stack. Formatting to a human-readable string happens only at the presentation layer via a single utility function.

```ts
// CORRECT
const price = 259900; // $2,599.00 in centavos
formatMoney(price); // → "$2.599,00"

// WRONG
const price = 2599.00;
```

`formatMoney(centavos: number): string` lives in `$lib/utils/formatMoney.ts` and is the only place where centavos are converted to display strings.

## Consequences
- No floating point bugs in price calculations
- All arithmetic is safe integer math
- Every developer must remember to pass centavos, not decimal values, to any money-related function