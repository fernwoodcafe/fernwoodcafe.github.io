import unitConversions from "../values/unitConversions";

export default (value: number, fromUnit: string, toUnit: string) => {
  if (fromUnit === toUnit) {
    return value;
  }

  const key = `${fromUnit}/${toUnit}`;

  return value * unitConversions[key];
};
