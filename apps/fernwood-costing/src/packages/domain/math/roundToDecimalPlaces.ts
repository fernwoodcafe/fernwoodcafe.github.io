export const roundToDecimalPlaces = (places: number, input: number) => {
  const tens = 10 ** places;
  return Math.round((input + Number.EPSILON) * tens) / tens;
};

export const roundToTwoDecimalPlaces = (input: number) =>
  roundToDecimalPlaces(2, input);
