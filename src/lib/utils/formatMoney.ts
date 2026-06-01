export function formatMoney(centavos: Centavos): string {
  const hasCentavos = centavos % 100 !== 0;
  const pesos = centavos / 100;

  return new Intl.NumberFormat('es-AR', {
    style:                 'currency',
    currency:              'ARS',
    minimumFractionDigits: hasCentavos ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(pesos);
}

type Centavos = number;