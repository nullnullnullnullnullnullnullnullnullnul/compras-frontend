type ColorPair = {
  name: string;
  bg: string;
  fg: string;
};

const pairs: ColorPair[] = [
  { name: 'text on bg',          bg: '#F5F5F5', fg: '#1A1A1A' },
  { name: 'text-muted on bg',    bg: '#F5F5F5', fg: '#6B6B6B' },
  { name: 'text on surface',     bg: '#FFFFFF', fg: '#1A1A1A' },
  { name: 'text-muted on surface', bg: '#FFFFFF', fg: '#6B6B6B' },
  { name: 'primary-fg on primary', bg: '#3A8C1C', fg: '#FFFFFF' },
  { name: 'danger on surface',   bg: '#FFFFFF', fg: '#B00020' },
  { name: 'warning on surface',  bg: '#FFFFFF', fg: '#8A5A00' },
  { name: 'success on surface',  bg: '#FFFFFF', fg: '#1A7A3A' },
];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0]! + 0.7152 * rgb[1]! + 0.0722 * rgb[2]!;
}

function contrastRatio(bg: string, fg: string): number {
  const l1 = luminance(bg);
  const l2 = luminance(fg);
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

let allPassed = true;

for (const pair of pairs) {
  const ratio = contrastRatio(pair.bg, pair.fg);
  const aa  = ratio >= 4.5;
  const aaa = ratio >= 7.0;
  const level = aaa ? 'AAA' : aa ? 'AA ' : 'FAIL';
  if (!aa) allPassed = false;
  console.log(`[${level}] ${pair.name.padEnd(28)} ${ratio.toFixed(2)}:1`);
}

console.log('');
console.log(allPassed ? '✅ All pairs pass AA minimum.' : '❌ Some pairs failed AA.');