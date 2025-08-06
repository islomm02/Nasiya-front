export function FormatterPrice(number: number) {
  if (typeof number !== 'number' && typeof number !== 'string') return number;

  return number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
