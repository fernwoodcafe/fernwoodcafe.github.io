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
    (conversion) => conversion.From === fromUnit && conversion.To === toUnit
  );

  return value * conversion.Multiplier;
};
