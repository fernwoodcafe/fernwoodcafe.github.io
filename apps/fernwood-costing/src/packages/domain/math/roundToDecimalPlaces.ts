export default (places: number, input: number) => {
  const tens = 10 ** places;
  return Math.round((input + Number.EPSILON) * tens) / tens;
};
