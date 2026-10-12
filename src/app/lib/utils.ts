export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null || isNaN(price)) {
    return '০ টাকা';
  }
  const formatted = price.toLocaleString('en-US');
  return `${toBengaliNumber(formatted)} টাকা`;
}