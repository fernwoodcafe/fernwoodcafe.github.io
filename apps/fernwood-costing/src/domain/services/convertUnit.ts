const smallPerBig = {
  ["ounce-per-pound"]: 16,
  ["gram-per-pound"]: 453.5924,
};

const unitConversionTable = Object.entries(smallPerBig).reduce(
  (acc, [key, value]) => {
    const reverseKey = key.split("-").reverse().join("-");
    const reverseValue = 1 / value;
    acc[reverseKey] = reverseValue;
    return acc;
  },
  smallPerBig
);

export default (value: number, fromUnit: string, toUnit: string) => {
  if (fromUnit === toUnit) {
    return value;
  }

  const key = `${fromUnit}-per-${toUnit}`;

  return value * unitConversionTable[key];
};
