import { describe, it, expect } from 'vitest';
import { formatMoney } from '$lib/utils/formatMoney';

describe('formatMoney', () => {
  it('formats whole pesos correctly', () => {
    expect(formatMoney(259900)).toBe('$\u00a02.599');
  });

  it('formats centavos correctly', () => {
    expect(formatMoney(259950)).toBe('$\u00a02.599,50');
  });

  it('formats zero correctly', () => {
    expect(formatMoney(0)).toBe('$\u00a00');
  });

  it('formats large amounts correctly', () => {
    expect(formatMoney(1000000)).toBe('$\u00a010.000');
  });
});