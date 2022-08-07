import type { UnitOfMeasure } from "../types/UnitOfMeasure";
import unitConversions from "../values/unitConversions";

export default (
  value: number,
  fromUnit: UnitOfMeasure,
  toUnit: UnitOfMeasure
) => {
  if (!fromUnit || !toUnit || fromUnit === toUnit) {
    return value;
  }

  const conversion = unitConversions.find(
    (conversion) =>
      conversion.FromUnit === fromUnit && conversion.ToUnit === toUnit
  );

  return value * conversion.Multiplier;
};
