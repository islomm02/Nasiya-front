export function FormatterPrice(number: string | number | undefined) {
  if (typeof number !== 'number' && typeof number !== 'string') return number;

  const numStr = number.toString();

  return {
    space: numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' '),  
    comma: numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ','),  
  };
}
