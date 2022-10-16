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

  if (!conversion) {
    // TODO Warn the user that updates to the menu item need to happen.
    console.error(`No conversion found for '${fromUnit}' to '${toUnit}'`);
    return value;
  }

  return value * conversion.Multiplier;
};
