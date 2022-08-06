export default (cost: number, fromUnit: string, toUnit: string) => {
  if (fromUnit === toUnit) {
    return cost;
  }

  const key = `${fromUnit}-per-${toUnit}`;

  const smallPerBig = {
    ["ounce-per-pound"]: 16,
    ["gram-per-pound"]: 453.5924,
  };

  const conversionMap = Object.entries(smallPerBig).reduce(
    (acc, [key, value]) => {
      const reverseKey = key.split("-").reverse().join("-");
      const reverseValue = 1 / value;
      acc[reverseKey] = reverseValue;
      return acc;
    },
    smallPerBig
  );

  return cost * conversionMap[key];
};
