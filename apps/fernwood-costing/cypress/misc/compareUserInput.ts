export const compareStrings = (a: string, b: string) => a.localeCompare(b);

export const compareCurrency = (a: string, b: string) => {
  // Trim the currency symbol.
  const first = parseInt(a.substring(1));
  const second = parseInt(b.substring(1));
  return first - second;
};

export const compareNumbers = (a: string, b: string) => {
  return parseInt(a) - parseInt(b);
};
